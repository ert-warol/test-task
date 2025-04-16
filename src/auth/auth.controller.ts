import {Controller, Get, Post, Body, UseGuards, Request, NotFoundException} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../guards/auth.guard';
import {User} from "../schemas/users.schema";
import {CreateUserDto} from "../dto/create-user.dto";
import {validateEmailHelper} from "../helpers/validate-email.helper";


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(@Body() userDto: CreateUserDto) {
        if (!validateEmailHelper(userDto.email)) {
            throw new NotFoundException(`Email "${userDto.email}" is not valid`);
        }

        return await this.authService.register(userDto);
    }

    @Post('login')
    async login(@Body() credentials: { email: string; password: string }) {
        return await this.authService.login(credentials);
    }

    @UseGuards(JwtAuthGuard)
    @Get('validate')
    async validate(@Request() req: { user: { userName: string } }): Promise<User> {
        return await this.authService.getValidUser(req.user.userName);
    }
}
