import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGameDto {
  @IsNotEmpty()
  @IsString()
  leagueId: string;

  @IsNotEmpty()
  @IsString()
  divisionId: string;

  @IsNotEmpty()
  @IsString()
  homeTeamId: string;

  @IsNotEmpty()
  @IsString()
  awayTeamId: string;

  @IsNotEmpty()
  @IsString()
  ruleSetId: string;

  @IsNotEmpty()
  @IsString()
  scheduledStartDatetime: Date;
}
