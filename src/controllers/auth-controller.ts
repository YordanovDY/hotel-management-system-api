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
        console.log(err);

        res.errors.internalServerError();
    }
}