import { NextFunction, Request, Response } from "express";
import { AUTH_COOKIE_NAME } from "../config/constants";
import asyncJWT from "../utils/jwt_util";

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies[AUTH_COOKIE_NAME];

    if (!token) {
        next();
        return;
    }

    try {
        const userData = await asyncJWT.verifyAuthToken(token);
        const { iat, exp, ...user } = userData;
        
        req.user = user;
        next();

    } catch (err) {
        res.clearCookie(AUTH_COOKIE_NAME);
        let message = 'Invalid or expired authentication token!';

        if (err instanceof Error) {
            message = err.message;
        }

        res.errors.unauthorized(`Unauthorized: ${message}`);
    }
}