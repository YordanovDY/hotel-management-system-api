import { Request, Response } from "express";
import { RegisterBody } from "../dtos/auth.dto";
import authService from "../services/auth-service";

// TODO: Create login, logout and register controllers

export async function registerController(req: Request<{}, {}, RegisterBody>, res: Response) {
    const data = req.body;

    try {
        const result = await authService.register(data);
        res.status(201).json(result);

    } catch (err) {
        if (err instanceof Error) {
            const message = err.message;
            if (message.startsWith('Validation Error')) {
                res.errors.badRequest(message);
                return;
            }
        }

        if (err instanceof Error) {
            const message = err.message;
            if (message.startsWith('Conflict')) {
                res.errors.conflict(message);
                return;
            }
        }

        console.log(err);
        res.errors.internalServerError();
    }
}