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

    const hashedPassword = await bcrypt.hash(validatedData.data.password, SALT_ROUNDS);
    const newUser = await UserClient.create({
        data: {
            email: validatedData.data.email,
            password: hashedPassword,
            first_name: validatedData.data.firstName,
            last_name: validatedData.data.lastName,
            phone_number: validatedData.data.phoneNumber,
            role_id: validatedData.data.roleId
        }
    });

    return {
        id: newUser.id,
        email: newUser.email,
        firstName: newUser.first_name,
        lastName: newUser.last_name,
        phoneNumber: newUser.phone_number,
        roleId: newUser.role_id
    };
}

async function login(data: LoginBody): Promise<User> {
    const validatedData = loginSchema.safeParse(data);

    if (!validatedData.success) {
        const validationError = extractErrorMessage<LoginBody>(validatedData.error.format());
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
        firstName: foundUser.first_name,
        lastName: foundUser.last_name,
        phoneNumber: foundUser.phone_number,
        roleId: foundUser.role_id
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