import {TransitionPresets } from '@react-navigation/stack';
import { StackNavigationOptions} from '@react-navigation/stack';

export const screenOptions:StackNavigationOptions = {
    headerMode: 'float',
    gestureEnabled: true,
    ...TransitionPresets.SlideFromRightIOS
}

export const options:StackNavigationOptions = {
    headerStyle:{        
        height: 60,
        borderBottomStartRadius: 10,
        borderBottomEndRadius: 10,
        backgroundColor: "#FFD700",
    }, 
    headerTitleContainerStyle: {
        width: '100%'
    },
    headerTitleStyle: {
        color: '#FFF',
        fontFamily: 'Inter-Bold',
        fontSize: 20,
    },
    headerTintColor: '#FFF',
}