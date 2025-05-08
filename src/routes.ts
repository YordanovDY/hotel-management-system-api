import { Router } from "express";
import authRouter from "./routes/auth-route";

const routes = Router();

routes.use('/auth', authRouter);

export default routes;