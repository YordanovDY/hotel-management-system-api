import express, { Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { attachErrorResponses } from '../middlewares/error-middleware';

export default function expressInit(): Application {
    const PORT = 3000;
    const app = express();

    app.use(express.json());

    app.use(cors({
        origin: 'http://localhost:4200',
        credentials: true
    }));

    app.use(cookieParser());

    app.use(attachErrorResponses);

    app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
    return app;
}