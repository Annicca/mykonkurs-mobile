import { FC } from "react";
import {Text} from 'react-native';
import { StyleProp, ViewStyle, TextStyle } from "react-native";
import Button from "../../uikit/button/button";

type ButtonWithTextProps = {
    activity?: () => void,
    buttonContainerStyle?: StyleProp<ViewStyle>,
    textStyle?: StyleProp<TextStyle>,
    text: string,
    disabled?: boolean
}

const ButtonWithText: FC<ButtonWithTextProps> = ({activity, buttonContainerStyle, textStyle, text, disabled}) => {

    return(
        <Button activity={activity} buttonStyle = {buttonContainerStyle} disabled={disabled}>
            <Text style={textStyle}>{text}</Text>
        </Button>
    )
}

export default ButtonWithText;