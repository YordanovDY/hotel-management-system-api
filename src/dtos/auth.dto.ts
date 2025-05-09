export interface RegisterBody {
    email: string,
    password: string,
    first_name: string,
    last_name: string,
    phone_number: string,
    role_id: number
}

export interface LoginBody {
    email: string,
    password: string
}