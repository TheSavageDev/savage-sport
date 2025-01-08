import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { GameEventDetails, GameEventType } from '../entities/game-event.entity';

export class CreateGameEventDto {
  @IsNotEmpty()
  @IsNumber(
    {
      allowNaN: false,
      allowInfinity: false,
      maxDecimalPlaces: 0,
    },
    {
      message: 'Inning must be a positive integer',
    },
  )
  inning: number;

  @IsNotEmpty()
  @IsString()
  teamId: string;

  @IsNotEmpty()
  @IsString()
  playerId: string;

  @IsNotEmpty()
  @IsEnum(GameEventType)
  eventType: GameEventType;

  @IsOptional()
  @IsObject({
    message: 'Details must be an object',
  })
  details?: GameEventDetails;
}
