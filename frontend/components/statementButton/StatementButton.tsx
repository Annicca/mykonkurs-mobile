import { FC } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { useNavigation, ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Button from '../button/button';
import LinearGradient from 'react-native-linear-gradient';


type StatementButtonProps = {
    text: string,
    containerStyle: object
}

const StatementButton: FC<StatementButtonProps> = ({text, containerStyle}) => {

    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

    return(
        <View style = {containerStyle}>
            <Button activity = {() => navigation.navigate('StatementForm')} buttonStyle={styleStatementButton.button}>
                <LinearGradient 
                    colors={['#FFE974', '#FFA15E']}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 0 }} 
                    style = {styleStatementButton.gradient}
                    >
                    <Text style = {styleStatementButton.text}>{text}</Text>
                </LinearGradient>
            </Button>
        </View>
    )
}

const styleStatementButton = StyleSheet.create({
    button: {
        width: 210,
        elevation: 8,
        shadowColor: '#000',
        borderRadius: 20,
        backgroundColor: '#FFF'
    },
    gradient: {
        paddingVertical: 9,
        paddingHorizontal: 15,
        borderRadius: 20,
        alignItems: 'center',
    },
    text: {
        fontFamily: 'Inter-Bold',
        fontSize: 12,
        color: '#000'
    }
})

export default StatementButton;