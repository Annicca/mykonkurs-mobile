import { FC } from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { screenOptions, options } from '../../src/utils/navigationOptions';
import Account from '../../src/screens/Account';
import MyStatements from '../../src/screens/MyStatements';
import StatementParticipant from '../../src/screens/StatementParticipant';
import MyGroups from '../../src/screens/MyGroups';
import MyCompetitions from '../../src/screens/MyCompetitions';
import StatementForm from '../../src/screens/StatementForm';
import Login from '../../src/screens/Login';
import Registry from '../../src/screens/Registry';

export type AccountParamList = {
    Account: undefined,
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
                    headerTitle: 'Вход',
                }}
            />
            <Stack.Screen
                name = 'Registry'
                component={Registry}
                options={{
                    ...options,
                    headerTitle: 'Регистрация',
                }}
            />
        </Stack.Navigator>
    )
}

export default NavBarAccount;