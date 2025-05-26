import { DBLiteRoom } from "../types/room-types";

export function formatRooms(result: DBLiteRoom[]) {
    const rooms = [];

    for (const room of result) {
        rooms.push({
            id: room.id,
            roomNumber: room.room_number,
            floor: room.floor,
            type: room.type
        });
    }

    // TODO: Separate floors

    return rooms;
}