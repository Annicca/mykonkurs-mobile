import {FC, useState} from 'react';
import { useForm } from 'react-hook-form';
import { instance } from '../utils/instance';
import { AccountParamList } from '../components/navigation/navBarAccount';
import { StackScreenProps } from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
import { Text, View } from "react-native"
import Button from '../uikit/button/button';
import InputControl from '../uikit/input/inputControl';
import { mainContainerStyle } from '../styles/containers/MainContainer';
import { authStyle } from '../styles/auth/authStyle';
import { yelowButtonStyle } from '../styles/yellowButton/yellowButton';
import { setData } from '../utils/asyncStorage/setData';

const Login: FC<StackScreenProps<AccountParamList, 'Login'>> = ({navigation}) => {

    const {control , handleSubmit, formState: {errors, isValid}} = useForm({mode: "onChange"})
    
    const [error, setError] = useState<string>('');

    const onSignIn = handleSubmit(async (data) => {
        console.log(data)
        await instance.post('login', JSON.stringify(data))
        .then((response) => {
            setData('user', JSON.stringify(response.data.user))
            setData('jwt', response.data.token)
            navigation.navigate('Account', ({user: response.data.user}))
        })
        .catch((error) =>{
            setError('Вы ввели неправильно логин или пароль')
            console.log(error.message);
        })
    });

    return (
        <View>
            <LinearGradient
            colors={['#FFE974', '#FFA15E']}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }} 
            style={authStyle.gradient}
            >
                <Button activity={() => navigation.goBack()} buttonStyle = {authStyle.backButton}>
                    <Text style={authStyle.backButtonText}>В аккаунт</Text>
                </Button>
                <View style = {[mainContainerStyle, authStyle.container]}>
                    <Text style = {authStyle.title}>Войти</Text>
                    <Button activity={() => navigation.navigate('Registry')}>
                        <Text style = {authStyle.link}>Ещё не зарегистрированы?</Text>
                    </Button>
                    <View style = {authStyle.form}>
                        <InputControl 
                            placeholder='Логин'
                            name = 'login'
                            control={control}
                            rules = {{
                                required : 'Поле обязательно',
                                minLength: {value: 5, message: 'Длина не менее 5 символов'},
                                pattern: {value: /^[A-Za-z0-9]+$/, message: "Логин должен содержать только буквы латинского алфавита и цифры"}
                            }}
                            error = {errors.login && errors.login.message?.toString()}
                            
                        />
                        <InputControl 
                            placeholder='Пароль' 
                            name = 'password'
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
                            error = {errors.password?.message}
                        />
                        <Button activity={onSignIn} buttonStyle = {yelowButtonStyle.button} disabled = {isValid}>
                            <Text style = {authStyle.textButton}>Войти</Text>
                        </Button>
                    </View>
                </View>
            </LinearGradient>
        </View>
    )
}

export default Login;