import bcrypt from 'bcrypt';
import { PrismaClient } from "../generated/prisma";
import { RegisterBody } from "../dtos/auth.dto";
import { User } from "../types/auth-types";
import { registerSchema } from '../validators/user.schema';
import { extractErrorMessage } from '../utils/error-util';

const prisma = new PrismaClient().user;

async function register(data: RegisterBody): Promise<User> {
    const validatedData = registerSchema.safeParse(data);

    if (!validatedData.success) {
        const validationError = extractErrorMessage<RegisterBody>(validatedData.error.format());
        throw new Error(`Validation Error: ${validationError}`);
    }


    const hashedPassword = await bcrypt.hash(data.password, 12);
    const newUser = await prisma.create({ data: { ...validatedData.data, password: hashedPassword } });

    return {
        id: newUser.id,
        email: newUser.email,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        phone_number: newUser.phone_number,
        role_id: newUser.role_id
    };
}

const authService = {
    register
}

export default authService;