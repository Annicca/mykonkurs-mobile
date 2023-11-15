import { UserRole } from "../consts/const"

export type UserType = {
    surnameUser: string,
    nameUser: string,
    patronimycUser: string,
    loginUser: string,
    passwordUser?: string,
    mailUser: string,
    phoneUser: string,
    role: UserRole,
    idUser: number
}