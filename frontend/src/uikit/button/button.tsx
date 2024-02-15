import {FC, PropsWithChildren} from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from "react-native"

type ButtonProps = {
    activity?: () => void,
    buttonStyle?: StyleProp<ViewStyle>,
    disabled?: boolean,
    onLongPress?: () => void
}

const Button: FC<PropsWithChildren<ButtonProps>> = ({activity = () => {}, onLongPress = () => {}, buttonStyle, children, disabled = false }) => {
    return (
        <TouchableOpacity
            onPress={activity}
            onLongPress={onLongPress}
            style = {buttonStyle}
            activeOpacity={ disabled ? 1 :  0.6}
            disabled = {disabled}
        >
            {children}
        </TouchableOpacity>
    )
}

export default Button;
