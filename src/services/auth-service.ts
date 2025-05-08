import bcrypt from 'bcrypt';
import { PrismaClient } from "../generated/prisma";
import { RegisterBody } from "../dtos/auth.dto";
import { User } from "../types/auth-types";

const prisma = new PrismaClient().user;

async function register(data: RegisterBody): Promise<User> {
    // TODO: Validation!!!

    const hashedPassword = await bcrypt.hash(data.password, 12);
    const newUser = await prisma.create({ data: { ...data, password: hashedPassword } });

    return { ...newUser };
}

const authService = {
    register
}

export default authService;