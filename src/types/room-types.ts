export type RoomType = 'Single' | 'Double' | 'Apartment' | 'President';

export type RoomExposure = 'North' | 'East' | 'South' | 'West';

export interface DBLiteRoom {
    id: string,
    room_number: string,
    type: string,
    floor: number
}

export interface LiteRoom {
    id: string,
    roomNumber: string,
    type: RoomType,
    floor: number
}