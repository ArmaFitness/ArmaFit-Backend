import { AuthService } from "./auth.service";
import { RegisterDto, LoginDto } from "./dto";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signup(dto: RegisterDto): Promise<{
        access_token: string;
    }>;
    signin(dto: LoginDto): Promise<{
        access_token: string;
    }>;
}
