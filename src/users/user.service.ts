import {PaginateDocument, PaginateModel, PaginateResult} from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/users.schema';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: PaginateModel<User>) {}

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
