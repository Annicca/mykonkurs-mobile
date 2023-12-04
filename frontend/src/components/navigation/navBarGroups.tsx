import { FC } from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { screenOptions, options } from '../../utils/navigationOptions';
import Groups from '../../screens/Groups';
import Group from '../../screens/Group';
import Header from '../header/header';
import Search from '../search/search';

export type GroupsParamList = {
    GroupsScreens: {
        url: string,
        value: string | undefined
    },
    Group: {
        url?: string,
        idGroup: number
    }
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
                initialParams={{url: 'groups'}}
                options={({route}) =>({
                    ...options,
                    headerTitle: () => <Header><Search url = {route.params.url}  /></Header>
                })}
            />
            <Stack.Screen
                name = 'Group'
                component={Group}
                initialParams={{url: 'groups'}}
                options= {{...options, headerTitle: ''}}
            />
        </Stack.Navigator>
    )
}

export default NavBarGroups;