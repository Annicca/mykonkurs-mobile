import {FC} from 'react';
import { Text } from "react-native"
import { StackScreenProps } from '@react-navigation/stack';
import { CompetitionsParamList } from '../../components/navigation/navBarCompetitions';

const Competition: FC<StackScreenProps<CompetitionsParamList, 'Competition'>> = ({route}) => {
    return (
        <Text style = {{color: "#000"}}>{route.params.idCompetition}</Text>
    )
}

export default Competition;