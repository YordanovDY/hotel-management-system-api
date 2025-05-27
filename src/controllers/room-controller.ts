import { Request, Response } from "express";
import { RoomBody, RoomParams, RoomQuery } from "../dtos/room.dto";
import roomService from "../services/room-service";
import eventService from "../services/event-service";

export async function getRoomsController(req: Request<{}, {}, {}, RoomQuery>, res: Response) {
    const { bedsCount } = req.query;

    try {
        const result = bedsCount ?
            await roomService.getAllRooms(Number(bedsCount))
            : await roomService.getAllRooms();
        res.json(result);

    } catch (err) {
        console.log(err);
        res.errors.internalServerError();
    }
}

export async function getRoomController(req: Request<RoomParams>, res: Response) {
    const { id } = req.params;

    try {
        const result = await roomService.getOneRoom(id);
        res.json(result);

    } catch (err) {
        if (err instanceof Error) {
            const message = err.message;
            if (message.startsWith('Not Found')) {
                res.errors.notFound(message);
                return;
            }
        }

        console.log(err);
        res.errors.internalServerError();
    }
}

export async function addRoomController(req: Request<{}, {}, RoomBody>, res: Response) {
    const data = req.body;
    const user = req.user;

    if (!user) {
        return;
    }

    try {
        const result = await roomService.createRoom(data);
        await eventService.createRoom(user, result.roomNumber);
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

export async function deleteRoomController(req: Request<RoomParams>, res: Response) {
    const { id } = req.params;
    const user = req.user;

    if(!user){
        return;
    }

    try {
        const result = await roomService.deleteRoom(id);
        await eventService.deleteRoom(user, result.roomNumber);
        res.json(result);

    } catch (err) {
        if (err instanceof Error) {
            const message = err.message;

            if (message.startsWith('Not Found')) {
                res.errors.notFound(message);
                return;
            }
        }

        console.log(err);
        res.errors.internalServerError();
    }
}