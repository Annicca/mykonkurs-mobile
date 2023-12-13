import { FC } from "react";
import { Controller } from "react-hook-form";
import { RadioButton, RadioButtonProps } from "react-native-radio-buttons-group";
import { RegisterOptions, FieldValues, Control, FieldError, Merge, FieldErrorsImpl } from "react-hook-form";
import { textStyle } from "../../styles/text/textStyle";

type RadioProps = {
    radioButtons: RadioButtonProps[]
    rules?: Omit<RegisterOptions<FieldValues, string>, "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"> | undefined,
    control: Control<FieldValues>,
    name: string,
    error?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> 
}

const RadioButtons : FC<RadioProps> =({radioButtons, control, name, rules}) => {
    return(
        <Controller
            control = {control}
            name={name}
            rules={rules}
            render = {({field: {value, onChange}}) => (
                <>
                {radioButtons.map((button) => (
                    <RadioButton
                      {...button}
                      id = {button.id}
                      key={button.id}
                      selected={button.id === value}
                      onPress={onChange}
                      value={button.value}
                      label={button.label}
                      labelStyle = {textStyle}
                      borderColor='#FF6B00'
                      color='#FF6B00'
                    />
                  ))}
                </>
        )} />
    )
}

export default RadioButtons;