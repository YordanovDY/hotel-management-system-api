import { Router } from "express";
import { loginController, logoutController, registerController, userController } from "../controllers/auth-controller";
const authRouter = Router();

authRouter.post('/login', loginController);
authRouter.post('/register', registerController);
authRouter.get('/logout', logoutController);
authRouter.get('/user', userController);

export default authRouter;