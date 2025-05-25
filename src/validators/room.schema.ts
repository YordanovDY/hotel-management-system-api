import { z } from 'zod';

export const roomSchema = z.object({
    roomNumber: z.string().toUpperCase().trim(),
    type: z.enum(['Single', 'Double', 'Apartment', 'President']),
    exposure: z.enum(['North', 'East', 'South', 'West']),
    floor: z.number().min(1).max(12),
    bedsCount: z.number().positive(),
    hasAc: z.boolean(),
    pricePerNight: z.number().positive()
});