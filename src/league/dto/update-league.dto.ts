import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateLeagueDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsDate()
  startDate: Date;

  @IsOptional()
  @IsDate()
  endDate: Date;

  @IsOptional()
  @IsString()
  teams: string[];

  @IsNotEmpty()
  @IsString()
  updatedBy: string;
}
