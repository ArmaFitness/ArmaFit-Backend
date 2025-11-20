import { IsInt } from 'class-validator';

export class CreateSessionDto {
  @IsInt()
  planId: number;
}
