import { FC } from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { options } from '../../utils/navigationOptions';
import Competitions from '../../screens/Competitions';
import Header from '../header/header';
import Search from '../search/search';
import Competition from '../../screens/Competition';

export type CompetitionsParamList = {
    CompetitionScreen: undefined,
    Competition: {idCompetition: number}
}

const Stack = createStackNavigator<CompetitionsParamList>();

const NavBarCompetitions: FC = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen
                name = 'CompetitionScreen'
                component={Competitions}
                options={{
                    ...options,
                    headerTitle: () => <Header><Search/></Header>
                }}
            />
            <Stack.Screen
                name = 'Competition'
                component={Competition}
                options= {{...options, headerTitle: ''}}
            />
        </Stack.Navigator>
    )
}

export default NavBarCompetitions;