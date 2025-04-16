import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from "../users/user.module";
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "../schemas/users.schema";


@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.register({
            secret: process.env.SECRET_KEY,
            signOptions: { expiresIn: process.env.TOKEN_LIVE_TIME },
        }),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy]
})
export class AuthModule {}
