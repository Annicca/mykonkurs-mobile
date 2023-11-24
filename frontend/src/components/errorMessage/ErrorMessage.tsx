import { FC } from "react";
import { StyleSheet, Text } from "react-native";
import { accentTextStyle } from "../../styles/accentText/AccentText";

type ErrorMessageProps = {
    message: string
}

const ErrorMessage: FC<ErrorMessageProps> = ({message}) => {
    return (
        <Text style = {[accentTextStyle, errorMessageStyle.text]}>{message}</Text>
    )
}

const errorMessageStyle = StyleSheet.create({
    text: {
        paddingTop: 40,
    }
})

export default ErrorMessage;