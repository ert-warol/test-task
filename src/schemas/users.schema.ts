import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserStatus } from '../helpers/user-status.enum.helper'
import * as mongoosePaginate from 'mongoose-paginate-v2';


@Schema()
class User {
    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    password: string;

    @Prop({ enum: UserStatus, default: UserStatus.ACTIVE })
    status: UserStatus;

    @Prop({ default: false })
    validateEmail: boolean;
}

const UserSchema = SchemaFactory.createForClass(User);

UserSchema.plugin(mongoosePaginate);

export { User, UserSchema }
