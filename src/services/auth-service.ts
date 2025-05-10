import bcrypt from 'bcrypt';
import { PrismaClient } from "../generated/prisma";
import { LoginBody, RegisterBody } from "../dtos/auth.dto";
import { User } from "../types/auth-types";
import { loginSchema, registerSchema } from '../validators/user.schema';
import { extractErrorMessage } from '../utils/error-util';
import { SALT_ROUNDS } from '../config/constants';

const UserClient = new PrismaClient().user;
const TokenClient = new PrismaClient().invalidToken;

async function register(data: RegisterBody): Promise<User> {
    const validatedData = registerSchema.safeParse(data);

    if (!validatedData.success) {
        const validationError = extractErrorMessage<RegisterBody>(validatedData.error.format());
        throw new Error(`Validation Error: ${validationError}`);
    }

    const foundUser = await UserClient.findFirst({
        where: {
            email: validatedData.data.email
        }
    });

    if (foundUser) {
        throw new Error('Conflict: User already exists!');
    }

    const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);
    const newUser = await UserClient.create({ data: { ...validatedData.data, password: hashedPassword } });

    return {
        id: newUser.id,
        email: newUser.email,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        phone_number: newUser.phone_number,
        role_id: newUser.role_id
    };
}

async function login(data: LoginBody): Promise<User> {
    const validatedData = loginSchema.safeParse(data);

    if (!validatedData.success) {
        const validationError = extractErrorMessage<RegisterBody>(validatedData.error.format());
        throw new Error(`Validation Error: ${validationError}`);
    }

    const foundUser = await UserClient.findFirst({
        where: {
            email: validatedData.data.email
        }
    });

    if (!foundUser) {
        throw new Error('Unauthorized: Invalid email or password!');
    }

    const isValidPassword = await bcrypt.compare(validatedData.data.password, foundUser.password);

    if (!isValidPassword) {
        throw new Error('Unauthorized: Invalid email or password!');
    }

    return {
        id: foundUser.id,
        email: foundUser.email,
        first_name: foundUser.first_name,
        last_name: foundUser.last_name,
        phone_number: foundUser.phone_number,
        role_id: foundUser.role_id
    }
}

async function logout(token: string, userId: string): Promise<void> {
    await TokenClient.create({
        data: {
            token,
            user_id: userId
        }
    })
}

async function validateToken(token: string): Promise<void> {
    const foundInvalidToken = await TokenClient.findFirst({
        where: {
            token
        }
    });

    if (foundInvalidToken) {
        throw new Error('Invalid authentication token!');
    }
}

const authService = {
    register,
    login,
    logout,
    validateToken,
}

export default authService;