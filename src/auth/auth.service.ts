import { ForbiddenException, HttpException, Injectable } from "@nestjs/common";
import { User } from "@prisma/client"
import { PrismaService } from "src/prisma/prisma.service";
import { RegisterDto, LoginDto } from "./dto";
import * as argon from "argon2";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";


@Injectable({})
export class AuthService{
    constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService) { }
    async signin(dto: LoginDto){
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            },
        });

        if (!user)
            throw new ForbiddenException(
                'Credentials incorrect',
            );

        const pwMatches = await argon.verify(user.passwordHash, dto.password);

        if(!pwMatches)
            throw new ForbiddenException(
                'Credentials incorrect',
            );

        return this.signToken(user.id, user.email);
    }

    async signup(dto: RegisterDto){
        const hash = await argon.hash(dto.password);
        try{
            
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    passwordHash: hash,
                    fullName: dto.fullName,
                    role: dto.role,
                  },
            });

            return this.signToken(user.id, user.email);
        } catch(error) {
            if(error instanceof PrismaClientKnownRequestError){
                if (error.code === 'P2002'){
                    throw new HttpException('Credentials taken', 422);
                }
            }
            throw error;
        }
    }

    async signToken(userId: number, email: string,): Promise<{access_token: string}>{
        const payload = {
            sub: userId,
            email,
        };
        const secret = this.config.get('JWT_SECRET');

        const token = await this.jwt.signAsync(payload, {expiresIn: '15m', secret: secret});

        return {
            access_token: token, 
        };

    }
}