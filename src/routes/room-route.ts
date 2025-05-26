import { Router } from "express";
import { requireAdminPermissions, requireToken } from "../middlewares/auth-middleware";
import { addRoomController, getRoomController, getRoomsController } from "../controllers/room-controller";

const roomRouter = Router();

roomRouter.get('/', requireToken, getRoomsController);
roomRouter.get('/:id', requireToken, getRoomController);
roomRouter.post('/', requireToken, requireAdminPermissions, addRoomController);

export default roomRouter;