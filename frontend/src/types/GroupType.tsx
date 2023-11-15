import { UserType } from "./UserType"

export type GroupType = {
    idGroup: number,
    director: UserType,
    nameGroup: string,
    descriptionGroup: string,
    cityGroup: string,
    addressGroup: string,
    category: string | null,
    img: string | null,
    competititons: []
}