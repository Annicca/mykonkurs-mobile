import { FC, useState } from "react";
import { View, Text, StyleSheet, TextInput, TextInputProps } from "react-native";
import { Control, FieldValues, FieldError, Merge, FieldErrorsImpl, RegisterOptions } from "react-hook-form/dist/types";
import {Controller} from 'react-hook-form'
import { accentTextStyle } from "../../styles/accentText/AccentText";
import { styleInput } from "../../styles/input";

type InputProps  = TextInputProps & {
    rules?: Omit<RegisterOptions<FieldValues, string>, "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"> | undefined,
    control: Control<FieldValues>,
    name: string,
    error?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> 
} ;

const InputControl: FC<InputProps> = ({
    control, 
    rules,
    name,
    error,
    placeholder, 
    placeholderTextColor, 
    defaultValue,
    secureTextEntry}) => {

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
                        style = {isFocused ? [styleInput.input, styleInput.focused] : styleInput.input} 
                        placeholderTextColor={placeholderTextColor ? placeholderTextColor : '#888'}
                        defaultValue={defaultValue}
                        value={value}
                        onChangeText={onChange}
                        onBlur={() => {onBlur(); handleBlur()}}
                        onFocus={handleFocus}
                    />
                )}
            />
            {error && <Text style = {styleInput.error}>{error.toString()}</Text>}
        </View>

    )
}

export default InputControl;