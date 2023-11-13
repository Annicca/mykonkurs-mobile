import { FC } from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { StackNavigationOptions} from '@react-navigation/stack';
import Account from '../../src/screens/Account';
import MyStatements from '../../src/screens/MyStatements';
import StatementParticipant from '../../src/screens/StatementParticipant';
import MyGroups from '../../src/screens/MyGroups';
import MyCompetitions from '../../src/screens/MyCompetitions';
import StatementForm from '../../src/screens/StatementForm';
import Login from '../../src/screens/Login';
import Registry from '../../src/screens/Registry';

export type StackParamList = {
    Account: undefined,
    MyStatements: undefined,
    StatementParticipant: undefined,
    MyGroups: undefined,
    MyCompetitions: undefined,
    StatementForm: undefined,
    Login: undefined,
    Registry: undefined
}

const Stack = createStackNavigator<StackParamList>();

const NavBarAccount: FC = () => {

    const screenOptions:StackNavigationOptions = {
        headerMode: 'float',
        gestureEnabled: true,
        ...TransitionPresets.SlideFromRightIOS
    }

    const options:StackNavigationOptions = {
        headerStyle:{        
            height: 60,
            borderBottomStartRadius: 10,
            borderBottomEndRadius: 10,
            backgroundColor: "#FFD700",
        }, 
        headerTitleStyle: {
            color: '#FFF',
            fontFamily: 'Inter-Bold',
            fontSize: 20,
        },
        headerTintColor: '#FFF',
    }

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