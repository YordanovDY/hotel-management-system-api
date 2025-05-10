import { Router } from "express";
import { loginController, logoutController, registerController } from "../controllers/auth-controller";
const authRouter = Router();

authRouter.post('/login', loginController);
authRouter.post('/register', registerController);
authRouter.get('/logout', logoutController);

export default authRouter;