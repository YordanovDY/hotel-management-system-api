import * as express from 'express-serve-static-core';
import { User } from '../auth-types';

declare global {
    namespace Express {
        interface Request {
            user?: User;
            cookies: {
                [key: string]: string;
            };
        }

        interface Response {
            errors: {
                internalServerError: (message?: string) => void;
                badRequest: (message?: string) => void;
                conflict: (message?: string) => void;
                notFound: (message?: string) => void;
                unauthorized: (message?: string) => void;
                forbidden: (message?: string) => void;
            }
        }
    }
}

export {};