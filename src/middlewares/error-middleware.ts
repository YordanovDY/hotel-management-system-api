import { Request, Response, NextFunction } from 'express';

export function attachErrorResponses(req: Request, res: Response, next: NextFunction) {
    res.errors = {
        internalServerError: (message = 'Internal Server Error') => {
            res.status(500).json({ status: 500, message });
        },
        
        badRequest: (message = 'Bad Request') => {
            res.status(400).json({ status: 400, message });
        },

        // notFound: (message = 'Not Found') => {
        //   res.status(404).json({ status: 404, message });
        // },
        // unauthorized: (message = 'Unauthorized') => {
        //   res.status(401).json({ status: 401, message });
        // },
        // forbidden: (message = 'Forbidden') => {
        //   res.status(403).json({ status: 403, message });
        // },
    };

    next();
}
