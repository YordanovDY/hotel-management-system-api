import { Request, Response } from "express";
import { LoginBody, RegisterBody } from "../dtos/auth.dto";
import authService from "../services/auth-service";
import asyncJWT from "../utils/jwt_util";
import { AUTH_COOKIE_NAME } from "../config/constants";
import { getDaysInMilliseconds } from "../utils/date-util";
import eventService from "../services/event-service";
import { User } from "../types/auth-types";

export async function registerController(req: Request<{}, {}, RegisterBody>, res: Response) {
    const data = req.body;
    const user = req.user as User;

    try {
        const result = await authService.register(data);
        await eventService.createUser(user, result);
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
        await eventService.login(user);

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
    const user = req.user as User;
    const userId = user.id;
    const token = req.cookies[AUTH_COOKIE_NAME];

    try {
        await authService.logout(token, userId);
        await eventService.logout(user);
        res.clearCookie(AUTH_COOKIE_NAME);
        res.status(204).end();

    } catch (err) {
        console.log(err);
        res.errors.internalServerError();
    }
}

export function userController(req: Request, res: Response) {
    const user = req.user;

    if (user) {
        res.json(user);
        return;
    }

    res.json(null);
}