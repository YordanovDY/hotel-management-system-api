export interface RegisterBody {
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    roleId: number
}

export interface LoginBody {
    email: string,
    password: string
}