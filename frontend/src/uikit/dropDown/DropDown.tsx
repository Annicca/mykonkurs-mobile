import { FC } from "react";
import RNPickerSelect, {PickerSelectProps} from 'react-native-picker-select';
import { View, Text, StyleSheet, DimensionValue } from "react-native";
import { Control, FieldValues, FieldError, Merge, FieldErrorsImpl, RegisterOptions } from "react-hook-form/dist/types";
import {Controller} from 'react-hook-form'
import { styleInput } from "../../styles/input";

type DropDownProps = PickerSelectProps & {
    rules?: Omit<RegisterOptions<FieldValues, string>, "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"> | undefined,
    control: Control<FieldValues>,
    name: string,
    error?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> ,
    containerWidth?: DimensionValue 
}

const DropDown: FC<DropDownProps> = ({
    control,
    name,
    rules,
    error,
    placeholder,
    items,
    value,
    containerWidth
}) => {
    return(
        <View style = {{width: containerWidth}}>
            <Controller 
                control = {control}
                name={name}
                rules={rules}
                render = {({field: {value: item, onChange}}) => (
                    <RNPickerSelect 
                        items = {items}
                        onValueChange={onChange}
                        style = {styleDropdown}  
                        value={item ? item : value}
                        placeholder={placeholder}
                    />
                )}
            />
            {error && <Text style = {styleInput.error}>{error.toString()}</Text>}
        </View>

    )
}

const styleDropdown = StyleSheet.create({
    viewContainer: {
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#FFD700',
    },
})

export default DropDown;