export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    roleId: number;
}

export interface UserToken {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    roleId: number;
    iat: number;
    exp: number;
}