import {FC} from 'react';
import { View, Text } from 'react-native';
import { Controller } from 'react-hook-form';
import { Control, FieldValues, FieldError, Merge, FieldErrorsImpl, RegisterOptions } from "react-hook-form/dist/types";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { textStyle } from '../../styles/text/textStyle';
import { styleInput } from '../../styles/input';

type CheckBoxProps = {
    label: string,
    rules?: Omit<RegisterOptions<FieldValues, string>, "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"> | undefined,
    control: Control<FieldValues>,
    name: string,
    defaultValue?: boolean,
    error?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> 
}

const CheckBox: FC<CheckBoxProps> = ({
    label,
    control,
    rules,
    name,
    error,
    defaultValue
}) => {
    return(
        <View style = {{width: '100%'}}>
            <Controller 
                control = {control}
                name={name}
                rules={rules}
                render = {({field: {value, onChange, onBlur}}) => (
                    <BouncyCheckbox 
                        size={20}
                        onPress={onChange}
                        style = {{}} 
                        text = {label}
                        isChecked={defaultValue}
                        textStyle = {[textStyle, {textDecorationLine: "none"}]}
                        fillColor='#FF6B00'
                        unfillColor='#FFF'
                    />
                )}
            />
            {error && <Text style = {styleInput.error}>{error.toString()}</Text>}
        </View>

    )
}

export default CheckBox;