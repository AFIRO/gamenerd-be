import { GameCreateDto } from "../entity/dto/game/game.create.dto"
import { GameOutputDto } from "../entity/dto/game/game.output.dto"
import { GameUpdateDto } from "../entity/dto/game/game.update.dto"
import { NewsCreateDto } from "../entity/dto/news/news.create.dto"
import { NewsUpdateDto } from "../entity/dto/news/news.update.dto"
import { ReviewCreateDto } from "../entity/dto/review/review.create.dto"
import { ReviewUpdateDto } from "../entity/dto/review/review.update.dto"
import { UserCreateDto } from "../entity/dto/user/user.create.dto"
import { UserOutputDtoShort } from "../entity/dto/user/user.output.dto.short"
import { UserUpdateDto } from "../entity/dto/user/user.update.dto"
import { Game } from "../entity/game.model"
import { News } from "../entity/news.model"
import { Review } from "../entity/review.model"
import { User } from "../entity/user.model"


export class TestData{

//primitive values
public static readonly ID = "testId"
public static readonly NAME = "testName"
public static readonly BOXART = "testBoxart"
public static readonly WRITER_ID = "testWriterId" 
public static readonly GAME_ID = "testGameId" 
public static readonly SCORE = 10
public static readonly ROLES = ["ADMIN"]
public static readonly PASSWORD = "testPassword"
public static readonly TOKEN = "testToken"
public static readonly CONTENT = "testContents"

//objects
public static readonly TEST_GAME = new Game({id: TestData.ID, name: TestData.NAME, boxart: TestData.BOXART})
public static readonly TEST_GAME_CREATE_DTO = new GameCreateDto({name: TestData.NAME, boxart: TestData.BOXART})
public static readonly TEST_GAME_UPDATE_DTO = new GameUpdateDto({id: TestData.ID, name: TestData.NAME, boxart: TestData.BOXART})
public static readonly TEST_GAME_OUTPUT_DTO = new GameOutputDto({id: TestData.ID, name: TestData.NAME, boxart: TestData.BOXART})
public static readonly TEST_USER = new User({id: TestData.ID, name: TestData.NAME, password: TestData.PASSWORD, roles: TestData.ROLES})
public static readonly TEST_USER_UPDATE_DTO = new UserUpdateDto({id: TestData.ID, name: TestData.NAME, password: TestData.PASSWORD, roles: TestData.ROLES})
public static readonly TEST_USER_CREATE_DTO = new UserCreateDto({name: TestData.NAME, password: TestData.PASSWORD, roles: TestData.ROLES})
public static readonly TEST_USER_SHORT_DTO = new UserOutputDtoShort({id: TestData.ID, name: TestData.NAME})
public static readonly TEST_NEWS = new News({id: TestData.ID, content: TestData.CONTENT, gameId: TestData.GAME_ID, writerId: TestData.WRITER_ID})
public static readonly TEST_NEWS_CREATE_DTO = new NewsCreateDto({content: TestData.CONTENT, gameId: TestData.GAME_ID, writerId: TestData.WRITER_ID})
public static readonly TEST_NEWS_UPDATE_DTO = new NewsUpdateDto({id: TestData.ID, content: TestData.CONTENT, gameId: TestData.GAME_ID, writerId: TestData.WRITER_ID})
public static readonly TEST_REVIEW = new Review({id: TestData.ID, content: TestData.CONTENT, gameId: TestData.GAME_ID, writerId: TestData.WRITER_ID, score: TestData.SCORE})
public static readonly TEST_REVIEW_CREATE_DTO = new ReviewCreateDto({content: TestData.CONTENT, gameId: TestData.GAME_ID, writerId: TestData.WRITER_ID, score: TestData.SCORE})
public static readonly TEST_REVIEW_UPDATE_DTO = new ReviewUpdateDto({id: TestData.ID, content: TestData.CONTENT, gameId: TestData.GAME_ID, writerId: TestData.WRITER_ID, score: TestData.SCORE})
} 