import { z } from 'zod';

export const registerSchema = z.object({
    email: z.string().email().toLowerCase(),
    password: z.string().min(6).trim(),
    firstName: z.string().min(1).max(50).trim(),
    lastName: z.string().min(1).max(50).trim(),
    phoneNumber: z.string().min(10).max(15).trim(),
    roleId: z.number().int().min(1).max(2),
});

export const loginSchema = z.object({
    email: z.string().email().toLowerCase(),
    password: z.string().min(1).trim(),
});