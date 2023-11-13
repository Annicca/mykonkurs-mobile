import { FC } from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';

import Groups from '../../src/screens/Groups';;
import Search from '../search/search';


const Stack = createStackNavigator();

const NavBarGroups: FC = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen
                name = 'GroupsScreens'
                component={Groups}
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

export default NavBarGroups;