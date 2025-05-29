import { DBLiteRoom, LiteRoom } from "../types/room-types";

export function formatRooms(result: DBLiteRoom[], lastFloor: number): LiteRoom[][] {
    if (result.length === 0) {
        return [];
    }

    const rooms = [];
    const formattedRooms: LiteRoom[][] = [];

    for (let i = 0; i < lastFloor; i++) {
        formattedRooms.push([]);
    }

    for (const room of result) {
        rooms.push({
            id: room.id,
            roomNumber: room.room_number,
            floor: room.floor,
            type: room.type
        });
    }

    let currentFloor = 1;

    for (const room of rooms) {

        while (room.floor !== currentFloor) {
            currentFloor++;

            if (currentFloor > 100) {
                throw new Error('function formatRooms: Too many iterations.');
            }
        }

        formattedRooms[currentFloor - 1].push(room);
    }

    return formattedRooms.reverse();
}