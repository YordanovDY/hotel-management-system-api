import { Router } from "express";
import { requireAdminPermissions, requireToken } from "../middlewares/auth-middleware";
import { addRoomController } from "../controllers/room-controller";

const roomRouter = Router();

roomRouter.post('/', requireToken, requireAdminPermissions, addRoomController);

export default roomRouter;