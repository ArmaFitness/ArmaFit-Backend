import { IsInt } from 'class-validator';

export class AddAthleteDto {
  @IsInt()
  athleteId: number;
}
