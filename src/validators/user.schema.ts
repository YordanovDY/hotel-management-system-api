import { z } from 'zod';

export const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    first_name: z.string().min(1).max(50),
    last_name: z.string().min(1).max(50),
    phone_number: z.string().min(10).max(15),
    role_id: z.number().int().min(1).max(2),
});

