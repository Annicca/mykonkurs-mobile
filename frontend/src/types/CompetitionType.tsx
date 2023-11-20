import { CityType } from "./CityType"
import { UserType } from "./UserType"

export type CompetitionType = {
    idCompetition: number,
    organizer: UserType,
    nameCompetition: string,
    descriptionCompetition: string,
    dateStart: string,
    dateFinish: string,
    cityCompetition: CityType,
    statusCompetition: string,
    img: string | null
}