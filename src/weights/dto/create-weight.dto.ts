import { IsDateString, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateWeightDto {
  @IsNotEmpty()
  weightKg: string;

  @IsDateString()
  date: string; // YYYY-MM-DD or ISO format
}
