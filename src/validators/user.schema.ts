import { z } from 'zod';

export const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    firstName: z.string().min(1).max(50),
    lastName: z.string().min(1).max(50),
    phoneNumber: z.string().min(10).max(15),
    roleId: z.number().int().min(1).max(2),
});

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
});

