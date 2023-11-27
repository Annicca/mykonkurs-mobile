import { FC } from "react";
import { View } from "react-native";
import { StepProps } from "../../types/StepProps";
import InputControl from "../../uikit/input/inputControl";

export const FirstStep:FC<StepProps> = ({step, control, errors}) => {
    if(step !== 1) return null
    return(
        <>
            <InputControl 
                placeholder='Фамилия'
                name = "surName"
                control={control}
                rules = {{
                    required : 'Поле обязательно',
                    pattern: {value: /^([A-Za-zА-Яа-яЁё]+$)/, message: "Поле должно содержать только буквы"}
                }}
                error = {errors.surName && errors.surName.message?.toString()}
            />                        
            <InputControl 
                placeholder='Имя'
                name = "name"
                control={control}
                rules = {{
                    required : 'Поле обязательно',
                    pattern: {value: /^([A-Za-zА-Яа-яЁё]+$)/, message: "Поле должно содержать только буквы"}
                }}
                error = {errors.name && errors.name.message?.toString()}
            />
            <InputControl 
                placeholder='Отчество'
                name = "patronimyc"
                control={control}
                rules = {{
                    required : 'Поле обязательно',
                    pattern: {value: /^([A-Za-zА-Яа-яЁё]+$)/, message: "Поле должно содержать только буквы"}
                }}
                error = {errors.patronimyc && errors.patronimyc.message?.toString()}
            />
        </>
    )
}