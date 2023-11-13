import { FC } from "react";
import { TextInput } from "react-native";

type TextInputProps = {
    placeholder: string,
    placeholderTextColor: string,
    inputStyle: object
}

const Input: FC<TextInputProps> = ({placeholder, placeholderTextColor, inputStyle}) => {
    return(
        <TextInput 
            placeholder = {placeholder}
            style = {inputStyle} 
            placeholderTextColor={placeholderTextColor}
        />
    )
}

export default Input;