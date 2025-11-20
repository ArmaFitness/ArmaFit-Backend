import { ArrayMinSize, IsArray, IsInt, Min } from 'class-validator';

export class ReorderPlanExercisesDto {
  @IsArray()
  @ArrayMinSize(1)
  order: { planExerciseId: number; orderIndex: number }[];
}
