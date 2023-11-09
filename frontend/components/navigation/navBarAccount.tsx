import { FC } from 'react';
import 'react-native-gesture-handler';
import { CardStyleInterpolators, createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { StackNavigationOptions} from '@react-navigation/stack';
import Account from '../../screens/Account';
import MyStatements from '../../screens/MyStatements';

export type StackParamList = {
    Account: undefined,
    MyStatements: undefined
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
        </Stack.Navigator>
    )
}

export default NavBarAccount;