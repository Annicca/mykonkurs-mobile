import { FC } from 'react';
import {StyleSheet} from 'react-native';
import { useNavigation, ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import ButtonGradient from '../../uikit/buttonGradient/ButtonGradient';


type StatementButtonProps = {
    text: string,
    containerStyle?: object
}

const StatementButton: FC<StatementButtonProps> = ({text, containerStyle}) => {

    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

    return(
        <ButtonGradient 
            action = {() => navigation.navigate('StatementForm')}
            text={text} 
            containerStyle = {containerStyle}
            buttonStyle = {styleStatement.button}/>
    )
}

const styleStatement = StyleSheet.create({
    button: {
        width: 210,
        borderRadius: 20,
        backgroundColor: '#FFF',
        borderColor: 'rgba(136, 136, 136, 0.1);',
        borderWidth: 1,

    },
})

export default StatementButton;