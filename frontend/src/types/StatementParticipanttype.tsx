import { StatementStatus } from "../consts/const"
import { CompetitionType } from "./CompetitionType"
import { GroupType } from "./GroupType"
import { UserType } from "./UserType"

export type StatementParticipantType = {
    id: number,
    user: UserType,
    group: GroupType,
    competition: CompetitionType,
    nameAct: string,
    countParticipants: number,
    status: StatementStatus
}