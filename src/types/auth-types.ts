export interface User {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    role_id: number;
}

export interface UserToken {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    role_id: number;
    iat: number;
    exp: number;
}