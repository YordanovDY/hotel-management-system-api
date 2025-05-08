import * as express from 'express-serve-static-core';

declare global {
    namespace Express {
        interface Response {
            errors: {
                internalServerError: () => void;
                badRequest: (message?: string) => void;
                // notFound: (message?: string) => void;
                // unauthorized: (message?: string) => void;
                // forbidden: (message?: string) => void;
            }
        }
    }
}