import { IsNotEmpty, IsString } from 'class-validator';
export class GameUpdateDto {
  @IsString()
  @IsNotEmpty()
  id: string;
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  boxart: string;

  public constructor(base?: Partial<GameUpdateDto>) {
    this.id = base.id || this.id;
    this.name = base.name || this.name;
    this.boxart = base.boxart || this.boxart;
  }
}