import { Router } from "express";
import authRouter from "./routes/auth-route";
import { authMiddleware } from "./middlewares/auth-middleware";
import roomRouter from "./routes/room-route";

const routes = Router();
routes.use(authMiddleware);

routes.use('/auth', authRouter);
routes.use('/rooms', roomRouter);

export default routes;