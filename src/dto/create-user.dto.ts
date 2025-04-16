import {IsEmail, IsNotEmpty, IsString, MinLength, MaxLength} from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(25)
    name: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(50)
    password: string;
}
