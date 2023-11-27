import { FC } from 'react';
import {View, Text, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import { useNavigation, ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Button from '../../uikit/button/button';
import LinearGradient from 'react-native-linear-gradient';

type ButtonGradientProps = {
    action: () => void,
    text: string,
    containerStyle?: StyleProp<ViewStyle>,
    buttonStyle?: StyleProp<ViewStyle>
}

const ButtonGradient: FC<ButtonGradientProps> = ({action, text, containerStyle, buttonStyle}) => {
    
    return(
        <View style = {containerStyle}>
            <Button activity = {action} buttonStyle={buttonStyle}>
                <LinearGradient 
                colors={['#FFE974', '#FFA15E']}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0 }} 
                style = {styleButtonGradient.gradient}
                >
                    <Text style = {styleButtonGradient.text}>{text}</Text>
                </LinearGradient>
            </Button>
        </View>
    )
}

const styleButtonGradient = StyleSheet.create({
    gradient: {
        paddingVertical: 9,
        paddingHorizontal: 15,
        borderRadius: 20,
        alignItems: 'center',
    },
    text: {
        fontFamily: 'Inter-Bold',
        fontSize: 14,
        color: '#000'
    }
})

export default ButtonGradient;