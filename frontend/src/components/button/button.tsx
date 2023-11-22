import {FC, PropsWithChildren} from 'react';
import { TouchableOpacity } from "react-native"

type ButtonProps = {
    activity?: () => void,
    buttonStyle?: object,
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
