import { PartialType } from '@nestjs/mapped-types';
import { CreateGameDto } from './create-game.dto';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsOptional,
} from 'class-validator';
import { GameStatus } from '../entities/game.entity';

export class UpdateGameDto extends PartialType(CreateGameDto) {
  @IsNotEmptyObject()
  @IsObject()
  score: {
    homeTeamScore: number;
    awayTeamScore: number;
  };

  @IsOptional()
  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
    maxDecimalPlaces: 0,
  })
  currentInning: number;

  @IsOptional()
  @IsEnum(GameStatus)
  status: GameStatus;

  @IsNotEmpty()
  @IsEmail()
  updatedBy: string;
}
