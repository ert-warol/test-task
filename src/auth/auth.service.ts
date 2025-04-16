import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { hashPassword, isPasswordValid } from '../helpers/working-with-password.helper'
import { UserService } from '../users/user.service'
import { User } from "../schemas/users.schema";


@Injectable()
export class AuthService {
    constructor(private userService: UserService) {}

    private users = new Map<string, string>();

    async register(userData: { email: string; password: string }) {
        this.users.set(userData.email, await hashPassword(userData.password));

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
