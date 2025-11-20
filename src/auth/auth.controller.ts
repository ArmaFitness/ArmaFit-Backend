import { Body, Controller, HttpCode, HttpStatus, ParseIntPipe, Post, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto, LoginDto } from "./dto";
import { PrismaService } from "src/prisma/prisma.service";

@Controller('auth')
export class AuthController{
    constructor(private authService: AuthService) {}
    
    @HttpCode(HttpStatus.OK)
    @Post('signup')
    signup(@Body() dto: RegisterDto) {
        return this.authService.signup(dto);
    }

    @Post('signin')
    signin(@Body() dto: LoginDto) {
        return this.authService.signin(dto);
    }
}