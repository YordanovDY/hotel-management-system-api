import { User } from "../types/auth-types";
import { PrismaClient } from "../generated/prisma";

const EventClient = new PrismaClient().events;

async function createUser(author: User, createdUser: User): Promise<void> {
    const action = `${author.firstName} ${author.lastName} created a new profile: ${createdUser.email}`;
    await EventClient.create({
        data: {
            action,
            user_id: author.id
        }
    })
}

async function login(user: User): Promise<void> {
    const action = `${user.firstName} ${user.lastName} logged in.`;
    await EventClient.create({
        data: {
            action,
            user_id: user.id
        }
    })
}

async function logout(user: User): Promise<void> {
    const action = `${user.firstName} ${user.lastName} logged out.`;
    await EventClient.create({
        data: {
            action,
            user_id: user.id
        }
    })
}

async function createRoom(author: User, createdRoom: string): Promise<void> {
    const action = `${author.firstName} ${author.lastName} created a new room: ${createdRoom}`;
    await EventClient.create({
        data: {
            action,
            user_id: author.id
        }
    })
}

async function deleteRoom(author: User, deletedRoom: string): Promise<void> {
    const action = `${author.firstName} ${author.lastName} deleted a room: ${deletedRoom}`;
    await EventClient.create({
        data: {
            action,
            user_id: author.id
        }
    })
}

const eventService = {
    createUser,
    login,
    logout,
    createRoom,
    deleteRoom,
}

export default eventService;