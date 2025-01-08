import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateLeagueDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsDate()
  startDate: Date;

  @IsNotEmpty()
  @IsDate()
  endDate: Date;

  @IsNotEmpty()
  @IsString()
  teams: string[];

  @IsNotEmpty()
  @IsString()
  createdBy: string;
}
