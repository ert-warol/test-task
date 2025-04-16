import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../guards/auth.guard';
import {User} from "../schemas/users.schema";


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(@Body() userData: { email: string; password: string }) {
        return await this.authService.register(userData);
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

    // return await this.authService.validate(authorizationToken?.split(' ')[1]);
}
