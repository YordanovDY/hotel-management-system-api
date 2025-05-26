import { RoomBody } from "../dtos/room.dto";
import { extractErrorMessage } from "../utils/error-util";
import { roomSchema } from "../validators/room.schema";
import { PrismaClient } from "../generated/prisma";
import { formatRooms } from "../utils/room-utils";

const RoomClient = new PrismaClient().room;

async function createRoom(data: RoomBody) {
    const validatedData = roomSchema.safeParse(data);

    if (!validatedData.success) {
        const validationError = extractErrorMessage<RoomBody>(validatedData.error.format());
        throw new Error(`Validation Error: ${validationError}`);
    }

    const foundRoom = await RoomClient.findFirst({
        where: {
            room_number: validatedData.data.roomNumber
        }
    })

    if (foundRoom) {
        throw new Error(`Conflict: Room ${foundRoom.room_number} already exists.`);
    }

    const newRoom = await RoomClient.create({
        data: {
            room_number: validatedData.data.roomNumber,
            type: validatedData.data.type,
            exposure: validatedData.data.exposure,
            floor: validatedData.data.floor,
            beds_count: validatedData.data.bedsCount,
            has_ac: validatedData.data.hasAc,
            price_per_night: validatedData.data.pricePerNight
        }
    });

    return newRoom;
}

async function getOneRoom(id: string) {
    const foundRoom = await RoomClient.findFirst({
        where: {
            id
        }
    });

    if (!foundRoom) {
        throw new Error(`Not Found: The room doesn't exist.`);
    }

    return {
        id: foundRoom.id,
        roomNumber: foundRoom.room_number,
        type: foundRoom.type,
        exposure: foundRoom.exposure,
        floor: foundRoom.floor,
        bedsCount: foundRoom.beds_count,
        hasAc: foundRoom.has_ac,
        pricePerNight: Number(foundRoom.price_per_night)
    };
}

async function getAllRooms(bedsCount?: number) {
    const where = bedsCount ?
        {
            beds_count: {
                gte: bedsCount
            }
        }
        : {};

    const result = await RoomClient.findMany({
        select: {
            id: true,
            room_number: true,
            type: true,
            floor: true
        },
        where,
        orderBy: {
            floor: 'asc'
        }
    });

    const rooms = formatRooms(result);

    return rooms;
}

const roomService = {
    createRoom,
    getOneRoom,
    getAllRooms,
}

export default roomService;