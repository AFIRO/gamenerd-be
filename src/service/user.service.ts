import { UserCreateDto } from "../entity/dto/user/user.create.dto";
import { UserOutputDto } from "../entity/dto/user/user.output.dto";
import { UserOutputDtoShort } from "../entity/dto/user/user.output.dto.short";
import { UserOutputDtoToken } from "../entity/dto/user/user.output.dto.token";
import { UserPasswordUpdateDto } from "../entity/dto/user/user.password.update.dto";
import { UserRegisterDto } from "../entity/dto/user/user.register.dto";
import { UserUpdateDto } from "../entity/dto/user/user.update.dto";
import { UserMapper } from "../mapper/user.mapper";
import { UserRepository } from "../repository/user.repository";
import { Logger } from "../util/logger";
import { PasswordHasher } from "../util/password.hasher";
import { AuthenticationService } from "./authentification.service";
export class UserService {
  private logger: Logger;
  public userRepository: UserRepository
  public authentificationService: AuthenticationService
  public passwordHasher: PasswordHasher

  public constructor() {
    this.logger = new Logger();
    this.userRepository = new UserRepository();
    this.authentificationService = new AuthenticationService();
    this.passwordHasher = new PasswordHasher()
  }

  public async findAll(): Promise<UserOutputDto[]> {
    this.logger.info(`UserService getting all users.`)
    const data = await this.userRepository.findAll();
    if (data.length != 0) {
      return data.map(UserMapper.toOutputDto);
    }
    else
      throw Error(`No users in database`)
  }

  public async findById(id: string): Promise<UserOutputDtoShort> {
    this.logger.info(`UserService getting user with id ${id}.`)
    const user = await this.userRepository.findById(id)
    if (!user) {
      this.logger.error(`User with id ${id} not found in repository.`);
      throw Error(`User with id ${id} not found`)
    }
    return UserMapper.toOutputDtoShort((user));
  }

  public async findByIdWithRoles(id: string): Promise<UserOutputDto> {
    this.logger.info(`UserService getting user with id ${id}.`)
    const user = await this.userRepository.findById(id)
    if (!user) {
      this.logger.error(`User with id ${id} not found in repository.`);
      throw Error(`User with id ${id} not found`)
    }
    return UserMapper.toOutputDto((user));
  }

  //public method for new user to register themselves
  public async register(registerDto: UserRegisterDto): Promise<UserOutputDtoToken> {
    this.logger.info(`UserService registering new user.`)
    registerDto.password = await this.passwordHasher.hashPassword(registerDto.password);
    const createDto: UserCreateDto = { name: registerDto.name, password: registerDto.password, roles: [] }
    const user = await this.userRepository.create(createDto)
    return this.authentificationService.makeLoginData(user);
  }

  //authenticated method for admin to create a user  
  public async create(dto: UserCreateDto): Promise<UserOutputDto> {
    this.logger.info(`UserService creating new user.`)
    dto.password = await this.passwordHasher.hashPassword(dto.password);
    return UserMapper.toOutputDto(await this.userRepository.create(dto));
  }

  public async update(id: string, dto: UserUpdateDto): Promise<UserOutputDto> {
    this.logger.info(`UserService updating user with id ${id}.`)
    if (id != dto.id) {
      this.logger.error(`Update failed due to validation error. Id ${id} in request does not match the Id ${dto.id} in body.`)
      throw Error(`Id ${id} in request does not match the Id ${dto.id} in body.`)
    }
    return UserMapper.toOutputDto((await this.userRepository.updateById(id, dto)));
  }

  public async updatePassword(id: string, dto: UserPasswordUpdateDto): Promise<UserOutputDto> {
    this.logger.info(`UserService updating password of user with id ${id}.`)
    if (id != dto.id) {
      this.logger.error(`Update failed due to validation error. Id ${id} in request does not match the Id ${dto.id} in body.`)
      throw Error(`Id ${id} in request does not match the Id ${dto.id} in body.`)
    }
    dto.password = await this.passwordHasher.hashPassword(dto.password);
    return UserMapper.toOutputDto((await this.userRepository.updatePasswordById(id, dto)));
  }

  public async delete(id: string): Promise<UserOutputDto> {
    if (await this.userRepository.existsById(id)) {
      return UserMapper.toOutputDto(await this.userRepository.deleteById(id))
    } else {
      this.logger.error(`User with id ${id} not found in repository.`);
      throw Error(`User with ${id} not found in database`)
    }
  }
}
