import {FC} from 'react'
import { View, Text, StyleSheet, Image} from 'react-native'
import { CompetitionType } from '../../types/CompetitionType'

type MyGroupItemProps = {
    competition: CompetitionType,
    deleteItem: () => void
}

const MyCompetitionItem: FC<MyGroupItemProps> = ({competition, deleteItem}) => {
    return(
        <View><Text>{competition.nameCompetition}</Text></View>
    )
}

export default MyCompetitionItem;