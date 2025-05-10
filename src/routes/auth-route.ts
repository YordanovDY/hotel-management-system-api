import { Router } from "express";
import { loginController, logoutController, registerController, userController } from "../controllers/auth-controller";
import { requireToken } from "../middlewares/auth-middleware";
const authRouter = Router();

authRouter.post('/login', loginController);
authRouter.post('/register', registerController);
authRouter.get('/logout', requireToken, logoutController);
authRouter.get('/user', userController);

export default authRouter;