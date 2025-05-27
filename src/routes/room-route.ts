import { Router } from "express";
import { requireAdminPermissions, requireToken } from "../middlewares/auth-middleware";
import { addRoomController, deleteRoomController, getRoomController, getRoomsController } from "../controllers/room-controller";

const roomRouter = Router();

roomRouter.get('/', requireToken, getRoomsController);
roomRouter.get('/:id', requireToken, getRoomController);
roomRouter.post('/', requireToken, requireAdminPermissions, addRoomController);
roomRouter.delete('/:id', requireToken, requireAdminPermissions, deleteRoomController)

export default roomRouter;