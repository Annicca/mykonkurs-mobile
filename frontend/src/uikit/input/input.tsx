import { FC } from "react";
import { TextInput, TextInputProps } from "react-native";

const Input: FC<TextInputProps> = ({placeholder, 
    placeholderTextColor, 
    style,
    defaultValue,
    value,
    onChangeText}) => {
    return(
        <TextInput 
            placeholder = {placeholder}
            style = {style} 
            placeholderTextColor={placeholderTextColor}
            defaultValue={defaultValue}
            value={value}
            onChangeText={onChangeText}
        />
    )
}

export default Input;