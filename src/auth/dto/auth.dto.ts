import { IsEmail, IsNotEmpty, MinLength, IsString, IsEnum } from 'class-validator';

export enum UserRoleDto {
  athlete = 'athlete',
  coach = 'coach',
}

// --------------------------------------------
// REGISTER DTO
// --------------------------------------------
export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsEnum(UserRoleDto)
  role: UserRoleDto;  // athlete | coach
}

// --------------------------------------------
// LOGIN DTO
// --------------------------------------------
export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
