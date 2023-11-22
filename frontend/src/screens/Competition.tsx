import {FC} from 'react';
import useFetch from '../hooks/useFetch';
import { Text } from "react-native"
import { StackScreenProps } from '@react-navigation/stack';
import { CompetitionsParamList } from '../components/navigation/navBarCompetitions';

const Competition: FC<StackScreenProps<CompetitionsParamList, 'Competition'>> = ({route}) => {

    const {data: group, loading, error} = useFetch(`groups/${route.params.idCompetition}`)

    return (
        <Text style = {{color: "#000"}}>{route.params.idCompetition}</Text>
    )
}

export default Competition;