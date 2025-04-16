import {Controller, Get, Query, NotFoundException, UseGuards} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../schemas/users.schema'
import { JwtAuthGuard } from "../guards/auth.guard";
import {PaginateDocument, PaginateResult} from "mongoose";

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @UseGuards(JwtAuthGuard)
    @Get('getUser')
    async getUserByEmail(@Query('email') email: string): Promise<User> {
        const user = await this.userService.getUserByEmail(email);

        if (!user) {
            throw new NotFoundException(`User with email "${email}" not found`);
        }

        return user;
    }

    @UseGuards(JwtAuthGuard)
    @Get('items')
    async getAllUser(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10
    ): Promise<PaginateResult<PaginateDocument<User, {}, {}>>> {
        return await this.userService.getAllUserWithPagination(page, limit);
    }
}
