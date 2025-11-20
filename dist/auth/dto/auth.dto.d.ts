export declare enum UserRoleDto {
    athlete = "athlete",
    coach = "coach"
}
export declare class RegisterDto {
    email: string;
    password: string;
    fullName: string;
    role: UserRoleDto;
}
export declare class LoginDto {
    email: string;
    password: string;
}
