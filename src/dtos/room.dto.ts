import { RoomExposure, RoomType } from "../types/room-types";

export interface RoomBody {
    roomNumber: string,
    type: RoomType,
    exposure: RoomExposure,
    floor: number,
    bedsCount: number,
    hasAc: boolean,
    pricePerNight: number
}


export type RoomParams = {
    id: string
}

export type RoomQuery = {
    bedsCount?: string
}