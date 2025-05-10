import { Router } from "express";
import authRouter from "./routes/auth-route";
import { authMiddleware } from "./middlewares/auth-middleware";

const routes = Router();
routes.use(authMiddleware);

routes.use('/auth', authRouter);

export default routes;