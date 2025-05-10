import { Request, Response } from "express";
import { LoginBody, RegisterBody } from "../dtos/auth.dto";
import authService from "../services/auth-service";
import asyncJWT from "../utils/jwt_util";
import { AUTH_COOKIE_NAME } from "../config/constants";
import { getDaysInMilliseconds } from "../utils/date-util";

// TODO: Create login, logout

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

export async function loginController(req: Request<{}, {}, LoginBody>, res: Response) {
    const data = req.body;

    try {
        const user = await authService.login(data);
        const token = await asyncJWT.signAuthToken(user);

        res
            .cookie(AUTH_COOKIE_NAME, token, {
                httpOnly: true,
                maxAge: getDaysInMilliseconds(7)
            })
            .json(user);

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
            if (message.startsWith('Unauthorized')) {
                res.errors.unauthorized(message);
                return;
            }
        }

        console.log(err);
        res.errors.internalServerError();
    }
}

export async function logoutController(req: Request, res: Response) {
    res.clearCookie(AUTH_COOKIE_NAME);
    res.status(204).end();
}