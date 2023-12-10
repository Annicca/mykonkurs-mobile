import { CityType } from "./CityType"
import { UserType } from "./UserType"

export type StatementType = {
    idStatement: number,
    user: UserType,
    type: string,
    name: string,
    description: string,
    city: CityType,
    address: string | null,
    dateStart: string | null,
    dateFinish: string | null,
    statusStatement: string | null
}