import * as bcrypt from 'bcrypt';

const hashPassword = async function (password: string): Promise<string> {
    const saltRounds = 5;

    return await bcrypt.hash(password, saltRounds);
}

const isPasswordValid = async function (password: string, hashedPassword: string): Promise<boolean> {
    if (!hashedPassword) {
        return false;
    }

    return await bcrypt.compare(password, hashedPassword);
}

export { hashPassword, isPasswordValid }
