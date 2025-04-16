import {PaginateDocument, PaginateModel, PaginateResult} from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/users.schema';
import { CreateUserDto } from '../dto/create-user.dto';
import { hashPassword } from '../helpers/working-with-password.helper'

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: PaginateModel<User>) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        createUserDto.password = await hashPassword(createUserDto.password)

        const createdUser = new this.userModel(createUserDto);

        try {
            return createdUser.save();
        } catch (error) {
            console.error(error)
        }
    }

    async getUserByEmail(email: string): Promise<User> {
        return await this.userModel.findOne({ email }).exec();
    }

    async getAllUserWithPagination(page: number, limit: number): Promise<PaginateResult<PaginateDocument<User, {}, {}>>> {
        const options = {
            page,
            limit,
        };

        return await this.userModel.paginate({}, options);
    }
}
