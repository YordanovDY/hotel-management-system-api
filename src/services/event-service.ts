import { User } from "../types/auth-types";
import { PrismaClient } from "../generated/prisma";

const EventClient = new PrismaClient().events;

async function createUser(author: User, createdUser: User): Promise<void> {
    const action = `${author.first_name} ${author.last_name} created a new profile: ${createdUser.email}`;
    await EventClient.create({
        data: {
            action,
            user_id: author.id
        }
    })
}

async function login(user: User) {
    const action = `${user.first_name} ${user.last_name} logged in.`;
    await EventClient.create({
        data: {
            action,
            user_id: user.id
        }
    })
}

async function logout(user: User) {
    const action = `${user.first_name} ${user.last_name} logged out.`;
    await EventClient.create({
        data: {
            action,
            user_id: user.id
        }
    })
}

const eventService = {
    createUser,
    login,
    logout
}

export default eventService;