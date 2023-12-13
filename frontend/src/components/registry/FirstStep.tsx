import { FC } from "react";
import { StepProps } from "../../types/StepProps";
import InputControl from "../../uikit/input/inputControl";

export const FirstStep:FC<StepProps> = ({step, control, errors}) => {
    if(step !== 1) return null
    return(
        <>
            <InputControl 
                placeholder='Фамилия'
                name = "surnameUser"
                control={control}
                rules = {{
                    required : 'Поле обязательно',
                    pattern: {value: /^([A-Za-zА-Яа-яЁё]+$)/, message: "Поле должно содержать только буквы"}
                }}
                error = {errors.surnameUser && errors.surnameUser.message?.toString()}
            />                        
            <InputControl 
                placeholder='Имя'
                name = "nameUser"
                control={control}
                rules = {{
                    required : 'Поле обязательно',
                    pattern: {value: /^([A-Za-zА-Яа-яЁё]+$)/, message: "Поле должно содержать только буквы"}
                }}
                error = {errors.nameUser && errors.nameUser.message?.toString()}
            />
            <InputControl 
                placeholder='Отчество'
                name = "patronimycUser"
                control={control}
                rules = {{
                    pattern: {value: /^([A-Za-zА-Яа-яЁё]+$)/, message: "Поле должно содержать только буквы"}
                }}
                error = {errors.patronimycUser && errors.patronimycUser.message?.toString()}
            />
        </>
    )
}