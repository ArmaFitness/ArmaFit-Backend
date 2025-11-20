import { PrismaService } from "src/prisma/prisma.service";
import { RegisterDto, LoginDto } from "./dto";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
export declare class AuthService {
    private prisma;
    private jwt;
    private config;
    constructor(prisma: PrismaService, jwt: JwtService, config: ConfigService);
    signin(dto: LoginDto): Promise<{
        access_token: string;
    }>;
    signup(dto: RegisterDto): Promise<{
        access_token: string;
    }>;
    signToken(userId: number, email: string): Promise<{
        access_token: string;
    }>;
}
