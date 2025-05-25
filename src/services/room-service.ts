import { RoomBody } from "../dtos/room.dto";
import { extractErrorMessage } from "../utils/error-util";
import { roomSchema } from "../validators/room.schema";
import { PrismaClient } from "../generated/prisma";

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

    if(foundRoom){
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

const roomService = {
    createRoom,
}

export default roomService;