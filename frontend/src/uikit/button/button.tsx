import {FC, PropsWithChildren} from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from "react-native"

type ButtonProps = {
    activity?: () => void,
    buttonStyle?: StyleProp<ViewStyle>,
}

const Button: FC<PropsWithChildren<ButtonProps>> = ({activity = () => {}, buttonStyle, children }) => {
    return (
        <TouchableOpacity
            onPress={activity}
            style = {buttonStyle}
            activeOpacity={0.6}
        >
            {children}
        </TouchableOpacity>
    )
}

export default Button;
