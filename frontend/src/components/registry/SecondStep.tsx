import { FC } from "react";
import { View } from "react-native";
import { StepProps } from "../../types/StepProps";
import InputControl from "../../uikit/input/inputControl";

export const SecondStep:FC<StepProps> = ({step, control, errors}) => {
    if(step !== 2) return null
    return(
        <>
            <InputControl 
                placeholder='Телефон'
                name = "phone"
                control={control}
                rules = {{
                    pattern: {value: /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/, message: "Неккоректно введён номер телефона"}
                }}
                error = {errors.phone && errors.phone.message?.toString()}
            />
            <InputControl 
                placeholder='Email'
                name = "email"
                control={control}
                rules = {{
                    required : 'Поле обязательно',
                    pattern: {value: /[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]/, message: "Неккоректно введён Email"}
                }}
                error = {errors.email && errors.email.message?.toString()}
            />
        </>
    )
}