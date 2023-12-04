import { FC } from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { options, screenOptions } from '../../utils/navigationOptions';
import Competitions from '../../screens/Competitions';
import Header from '../header/header';
import Search from '../search/search';
import Competition from '../../screens/Competition';
import StatementParticipantFrom from '../../screens/StatementParticipantFrom';

export type CompetitionsParamList = {
    CompetitionScreen: {
        url: string,
        value: string | undefined
    },
    Competition: {
        url?: string
        idCompetition: number,
    },
    StatementParticipantFrom: {
        url?: string
        idCompetition: number,
    }
}

const Stack = createStackNavigator<CompetitionsParamList>();

const NavBarCompetitions: FC = () => {
    return(
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen
                name = 'CompetitionScreen'
                component={Competitions}
                initialParams={{url: 'competitions'}}
                options={({route}) => ({
                    ...options,
                    headerTitle: () => <Header><Search url = {route.params.url} /></Header>
                })}
            />
            <Stack.Screen
                name = 'Competition'
                initialParams={{url: 'competitions'}}
                component={Competition}
                options= {{...options, headerTitle: ''}}
            />
            <Stack.Screen
                name = 'StatementParticipantFrom'
                initialParams={{url: 'competitions'}}
                component={StatementParticipantFrom}
                options= {{...options, headerTitle: 'Подать заявку на участие'}}
            />
        </Stack.Navigator>
    )
}

export default NavBarCompetitions;