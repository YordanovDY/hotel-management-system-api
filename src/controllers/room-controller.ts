import { Request, Response } from "express";
import { RoomBody } from "../dtos/room.dto";
// import { User } from "../generated/prisma";
import roomService from "../services/room-service";
import eventService from "../services/event-service";

function getRoomsController(req: Request, res: Response) {

}

function getRoomController(req: Request, res: Response) {

}

export async function addRoomController(req: Request<{}, {}, RoomBody>, res: Response) {
    const data = req.body;
    const user = req.user;

    if (!user) {
        return;
    }

    try {
        const result = await roomService.createRoom(data);
        await eventService.createRoom(user, result.room_number);
        res.status(201).json(result);

    } catch (err) {
        if (err instanceof Error) {
            const message = err.message;
            if (message.startsWith('Validation Error')) {
                res.errors.badRequest(message);
                return;
            }
        }

        if (err instanceof Error) {
            const message = err.message;
            if (message.startsWith('Conflict')) {
                res.errors.conflict(message);
                return;
            }
        }

        console.log(err);
        res.errors.internalServerError();
    }
}