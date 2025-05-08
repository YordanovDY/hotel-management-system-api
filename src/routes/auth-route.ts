import { Router } from "express";
const authRouter = Router();

authRouter.post('/login', () => { });
authRouter.post('/register', () => { });
authRouter.get('/logout', () => { });

export default authRouter;