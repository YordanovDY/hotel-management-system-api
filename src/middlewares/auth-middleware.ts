import { NextFunction, Request, Response } from "express";
import { AUTH_COOKIE_NAME } from "../config/constants";
import asyncJWT from "../utils/jwt_util";
import authService from "../services/auth-service";

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies[AUTH_COOKIE_NAME];

    if (!token) {
        next();
        return;
    }

    try {
        await authService.validateToken(token);

    } catch (err) {
        res.clearCookie(AUTH_COOKIE_NAME);
        let message = 'Invalid or expired authentication token!';

        if (err instanceof Error) {
            message = err.message;
        }

        res.errors.unauthorized(`Unauthorized: ${message}`);
        return;
    }

    try {
        const userData = await asyncJWT.verifyAuthToken(token);
        const { iat, exp, ...user } = userData;

        req.user = user;
        next();

    } catch (err) {
        res.clearCookie(AUTH_COOKIE_NAME);
        res.errors.unauthorized('Unauthorized: Invalid or expired authentication token!');
        return;
    }
}

export function requireToken(req: Request, res: Response, next: NextFunction) {
    const user = req.user;

    if (!user) {
        res.errors.unauthorized('Unauthorized: Authentication token required!');
        return;
    }

    next();
}