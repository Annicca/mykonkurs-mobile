import { FC } from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { screenOptions, options } from '../../src/utils/navigationOptions';
import Groups from '../../src/screens/Groups';
import Group from '../../src/screens/Group';
import Header from '../header/header';
import Search from '../search/search';

export type GroupsParamList = {
    GroupsScreens: undefined,
    Group: {idGroup: number}
}

const Stack = createStackNavigator<GroupsParamList>();

const NavBarGroups: FC = () => {
    return(
        <Stack.Navigator
            screenOptions={screenOptions}
        >
            <Stack.Screen
                name = 'GroupsScreens'
                component={Groups}
                options={{
                    ...options,
                    headerTitle: () => <Header><Search/></Header>
                }}
            />
            <Stack.Screen
                name = 'Group'
                component={Group}
                options= {{...options, headerTitle: ''}}
            />
        </Stack.Navigator>
    )
}

export default NavBarGroups;