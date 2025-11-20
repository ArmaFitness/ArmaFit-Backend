import { IsInt } from 'class-validator';

export class AssignPlanDto {
  @IsInt()
  athleteId: number;
}
