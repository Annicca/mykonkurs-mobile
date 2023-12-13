import { FC } from "react";
import { StepProps } from "../../types/StepProps";
import InputControl from "../../uikit/input/inputControl";

export const ThirdStep:FC<StepProps> = ({step, control, errors}) => {
    if(step !== 3) return null
    return(
        <>
            <InputControl 
                placeholder='Логин'
                name = 'loginUser'
                control={control}
                rules = {{
                    required : 'Поле обязательно',
                    minLength: {value: 5, message: 'Длина не менее 5 символов'},
                    pattern: {value: /^[A-Za-z0-9]+$/, message: "Логин должен содержать только буквы латинского алфавита и цифры"}
                }}
                error = {errors.loginUser && errors.loginUser.message?.toString()}
                
            />
            <InputControl 
                placeholder='Пароль' 
                name = 'passwordUser'
                secureTextEntry={true}
                control={control}
                rules = {{
                    required : 'Поле обязательно',
                    minLength: {value: 8, message: 'Длина не менее 8 символов'},
                    validate: {
                        includeNumber: (value) => /[0-9]/.test(value) || "Пароль должен содержать цифры",
                        includeLatinLetters: (value) => /[A-Za-z]/.test(value) || "Пароль должен содержать буквы латинского алфавита",
                        includeSpecialCharacter: (value) => /[!@#$%^&*]/.test(value) || "Пароль должен содержать хотя бы 1 спецсимвол"
                    }
                }}
                error = {errors.passwordUser && errors.passwordUser.message?.toString()}
            />
        </>
    )
}