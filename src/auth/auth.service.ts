import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { hashPassword, isPasswordValid } from '../helpers/working-with-password.helper'
import { UserService } from '../users/user.service'
import { User } from "../schemas/users.schema";
import { CreateUserDto } from "../dto/create-user.dto";
import { PaginateModel } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { MessageDto } from "../dto/messege.dto";


@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: PaginateModel<User>, private userService: UserService) {}

    async register(createUserDto: CreateUserDto): Promise<MessageDto> {
        createUserDto.password = await hashPassword(createUserDto.password);

        const createdUser = new this.userModel(createUserDto);

        await createdUser.save();

        return { message: 'User registered' };
    }

    async login(credentials: { email: string; password: string }) {
        const user = await this.userService.getUserByEmail(credentials.email);
        const validPass = await isPasswordValid(credentials.password, user.password)

        if (!validPass) {
            return { message: 'Invalid password' };
        }

        return { token: jwt.sign({ login: credentials.email }, process.env.SECRET_KEY, { expiresIn: '8h' }) };
    }

    async getValidUser(email: string): Promise<User> {
        return await this.userService.getUserByEmail(email);
    }
}
