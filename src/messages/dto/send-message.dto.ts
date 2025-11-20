import { IsInt, IsString, MinLength } from 'class-validator';

export class SendMessageDto {
  @IsInt()
  receiverId: number;

  @IsString()
  @MinLength(1)
  content: string;
}
