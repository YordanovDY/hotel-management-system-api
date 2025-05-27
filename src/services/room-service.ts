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

    return {
        id: newRoom.id,
        roomNumber: newRoom.room_number,
        type: newRoom.type,
        exposure: newRoom.exposure,
        floor: newRoom.floor,
        bedsCount: newRoom.beds_count,
        hasAc: newRoom.has_ac,
        pricePerNight: Number(newRoom.price_per_night)
    };
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

    const lastFloor = await getLastFloor();

    const rooms = formatRooms(result, lastFloor);

    return rooms;
}

async function getLastFloor(): Promise<number> {
    const result = await RoomClient.aggregate({
        _max: {
            floor: true
        }
    })

    return result._max.floor || 1;
}

async function deleteRoom(id: string) {
    try {
        const result = await RoomClient.delete({
            where: {
                id
            }
        });

        return {
            id: result.id,
            roomNumber: result.room_number,
            type: result.type,
            exposure: result.exposure,
            floor: result.floor,
            bedsCount: result.beds_count,
            hasAc: result.has_ac,
            pricePerNight: Number(result.price_per_night)
        };

    } catch (err) {
        throw new Error(`Not Found: The room doesn't exist.`);
    }
}

const roomService = {
    createRoom,
    getOneRoom,
    getAllRooms,
    deleteRoom,
}

export default roomService;