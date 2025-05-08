import { Router } from "express";
import { registerController } from "../controllers/auth-controller";
const authRouter = Router();

authRouter.post('/login', () => { });
authRouter.post('/register', registerController);
authRouter.get('/logout', () => { });

export default authRouter;