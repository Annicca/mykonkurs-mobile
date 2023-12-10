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
import Participants from '../../screens/Participants';
import Users from '../../screens/Users';
import Search from '../search/search';
import { useUserContext } from '../../context/UserContext';
import { StatementType, UserRole } from '../../consts/const';
import EditItem from '../../screens/EditItem';

export type AccountParamList = {
    Account: undefined,
    MyStatements: {
        url: string,
        value?: string | undefined
    },
    StatementParticipant: {urlPoint: string},
    MyGroups: undefined,
    EditItem: {
        urlPoint: string, 
        idItem: number,
        type: StatementType
    },
    MyCompetitions: {urlPoint: string, idItem?: number},
    Users: {url: string,
        value?: string
    },
    Participants: {competitionId: number},
    StatementForm: undefined,
    Login: undefined,
    Registry: undefined
}

const Stack = createStackNavigator<AccountParamList>();

const NavBarAccount: FC = () => {

    const { user } = useUserContext().context

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
                initialParams={{url: 'statements/search'}}
                options={({route}) => ({
                    ...options,
                    headerTitle: user?.role === UserRole.ADMIN ? () => <Search url = {route.params.url} placeholder='Введите номер' /> : 'Заявки',
                })}
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
                name = 'EditItem'
                component={EditItem}
                options={{
                    ...options,
                    headerTitle: '',
                }}
            />
            <Stack.Screen
                name = 'Participants'
                component={Participants}
                options={{
                    ...options,
                    headerTitle: 'Участники',
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
            <Stack.Screen
                name = 'Users'
                component={Users}
                initialParams={{url: 'users/search'}}
                options={({route}) => ({
                    ...options,
                    headerTitle: () => <Search url = {route.params.url} placeholder='Введите логин' />
                })}
            />
        </Stack.Navigator>
    )
}

export default NavBarAccount;