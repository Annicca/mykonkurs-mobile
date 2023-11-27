import {FC, PropsWithChildren} from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from "react-native"

type ButtonProps = {
    activity?: () => void,
    buttonStyle?: StyleProp<ViewStyle>,
    disabled?: boolean
}

const Button: FC<PropsWithChildren<ButtonProps>> = ({activity = () => {}, buttonStyle, children, disabled = false }) => {
    return (
        <TouchableOpacity
            onPress={activity}
            style = {buttonStyle}
            activeOpacity={ disabled ? 1 :  0.6}
            disabled = {disabled}
        >
            {children}
        </TouchableOpacity>
    )
}

export default Button;
