import { FC } from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import Competitions from '../../screens/Competitions';
import Search from '../search/search';

const Stack = createStackNavigator();

const NavBarCompetitions: FC = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen
                name = 'CompetitionsScreens'
                component={Competitions}
                options={{
                    headerTitleContainerStyle: {
                        backgroundColor: '#FFD700',
                    },
                    headerTitle: () => <Search/>
                }}
            />
        </Stack.Navigator>
    )
}

export default NavBarCompetitions;