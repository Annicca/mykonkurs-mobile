import { FC } from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { screenOptions, options } from '../../utils/navigationOptions';
import Account from '../../screens/Account';
import MyStatements from '../../screens/MyStatements';
import StatementParticipant from '../../screens/StatementParticipant';
import MyGroups from '../../screens/MyGroups';
import MyCompetitions from '../../screens/MyCompetitions';
import StatementForm from '../../screens/StatementForm';
import Login from '../../screens/Login';
import Registry from '../../screens/Registry';
import { UserType } from '../../types/UserType';

export type AccountParamList = {
    Account: {user?: UserType | null},
    MyStatements: undefined,
    StatementParticipant: undefined,
    MyGroups: undefined,
    MyCompetitions: undefined,
    StatementForm: undefined,
    Login: undefined,
    Registry: undefined
}

const Stack = createStackNavigator<AccountParamList>();

const NavBarAccount: FC = () => {

    return(
        <Stack.Navigator
            screenOptions={screenOptions}
        >
            <Stack.Screen
                name = 'Account'
                key = {'accountScreen'}
                component={Account}
                options={{
                    ...options,
                    headerTitle: 'Кабинет',
                }}
            />
            <Stack.Screen
                name = 'MyStatements'
                component={MyStatements}
                options={{
                    ...options,
                    headerTitle: 'Мои заявки',
                }}
            />
            <Stack.Screen
                name = 'StatementParticipant'
                component={StatementParticipant}
                options={{
                    ...options,
                    headerTitle: 'Заявки на участие',
                }}
            />
            <Stack.Screen
                name = 'MyGroups'
                component={MyGroups}
                options={{
                    ...options,
                    headerTitle: 'Мои коллективы',
                }}
            />
            <Stack.Screen
                name = 'MyCompetitions'
                component={MyCompetitions}
                options={{
                    ...options,
                    headerTitle: 'Мои конкурсы',
                }}
            />
            <Stack.Screen
                name = 'StatementForm'
                component={StatementForm}
                options={{
                    ...options,
                    headerTitle: 'Заявка на размещение',
                }}
            />
            <Stack.Screen
                name = 'Login'
                component={Login}
                options={{
                    ...options,
                    headerShown: false
                }}
            />
            <Stack.Screen
                name = 'Registry'
                component={Registry}
                options={{
                    ...options,
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )
}

export default NavBarAccount;