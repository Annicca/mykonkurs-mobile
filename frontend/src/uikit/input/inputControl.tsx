import { FC, useState } from "react";
import { View, Text, TextInput } from "react-native";
import { InputProps } from "../../types/InputProps";
import {Controller} from 'react-hook-form'
import { accentTextStyle } from "../../styles/accentText/AccentText";
import { styleInput } from "../../styles/input";

const InputControl: FC<InputProps> = ({
    control, 
    rules,
    name,
    error,
    placeholder, 
    placeholderTextColor, 
    defaultValue,
    secureTextEntry,
    multiline,
    numberOfLines,
    style}) => {

    const [isFocused, setFocused] = useState(false)
    
    const handleFocus = () => {
        setFocused(true)
    }

    const handleBlur = () => {
        setFocused(false)
    }

    return(
        <View style = {{width: '100%'}}>
            {rules?.required && <Text style={accentTextStyle}>*</Text>}
            <Controller 
                control = {control}
                name={name}
                rules={rules}
                render = {({field: {value, onChange, onBlur}}) => (
                    <TextInput 
                        placeholder = {placeholder}
                        secureTextEntry = {secureTextEntry}
                        style = {isFocused ? [styleInput.input, styleInput.focused, style] : [styleInput.input, style]} 
                        placeholderTextColor={placeholderTextColor ? placeholderTextColor : '#888'}
                        defaultValue={defaultValue}
                        value={value ? value : defaultValue}
                        onChangeText={onChange}
                        onBlur={() => {onBlur(); handleBlur()}}
                        onFocus={handleFocus}
                        multiline={multiline}
                        numberOfLines={numberOfLines}
                        textAlignVertical="top"
                    />
                )}
            />
            {error && <Text style = {styleInput.error}>{error.toString()}</Text>}
        </View>

    )
}

export default InputControl;