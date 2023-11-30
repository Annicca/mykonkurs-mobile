import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useUserContext } from '../context/UserContext';
import { instance } from '../utils/instance';
import { View, Text, Image, StyleSheet } from "react-native"
import { StackScreenProps } from '@react-navigation/stack';
import { AccountParamList } from '../components/navigation/navBarAccount';
import LinearGradient from 'react-native-linear-gradient';
import ButtonWithText from '../uikit/buttonWithText/ButtonWithText';
import Button from '../uikit/button/button';
import { FirstStep } from '../components/registry/FirstStep';
import { SecondStep } from '../components/registry/SecondStep';
import { ThirdStep } from '../components/registry/ThirdStep';
import { ArrowLeft, ArrowRight } from '../../public/icons';
import { mainContainerStyle } from '../styles/containers/MainContainer';
import { authStyle } from '../styles/auth/authStyle';
import { yelowButtonStyle } from '../styles/yellowButton/yellowButton';
import { setData } from '../utils/asyncStorage/setData';
import { accentTextStyle } from '../styles/accentText/AccentText';

const Registry: FC<StackScreenProps<AccountParamList, 'Registry'>> = ({navigation}) => {

    const {context, setContext} = useUserContext()

    const {control , handleSubmit, trigger, formState: {errors, isValid}} = useForm({mode: "onChange", reValidateMode: 'onSubmit'})

    const [error, setError] = useState<string>('');

    const [step, setStep] = useState<number>(1);

    useEffect(() => {
        !isValid && setError('* Пожалуйста, проверьте все обязательные поля')

    }, [isValid])

    const goNext = () => {
        trigger();
        if(step < 3) setStep(step => step+1)
    }

    const goBack = () => {
        if(step > 1) setStep(step => step-1)
    }

    const onRegistry = handleSubmit(async (data) => {
        await instance.post('login', JSON.stringify(data))
        .then((response) => {
            setData('user', JSON.stringify(response.data.user))
            setData('jwt', response.data.token)
            setContext({user: response.data.user, jwt: response.data.token})
            navigation.navigate('Account')
        })
        .catch((error) =>{
            setError('Вы ввели неправильно логин или пароль')
            console.log(error.data.message);
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
                <ButtonWithText activity={() => navigation.goBack()} text = 'В кабинет' buttonContainerStyle={authStyle.backButton} textStyle = {authStyle.backButtonText} />
                <View style = {[mainContainerStyle, authStyle.container]}>
                    <Text style = {authStyle.title}>Зарегистрироваться</Text>
                    { step === 1 ?  
                        <ButtonWithText activity={() => navigation.navigate('Login')} text = 'Уже зарегистрированы?' textStyle = {authStyle.link} /> :
                        step === 2 ? <Text style = {authStyle.link}>Введите свои контактные данные</Text> :
                        step === 3 && <Text style = {authStyle.link}>Придумайте логин и пароль</Text>}
                    <View style = {authStyle.form}>
                        <FirstStep step = {step} control = {control} errors = {errors} />
                        <SecondStep step = {step} control = {control} errors = {errors} />
                        <ThirdStep step = {step} control = {control} errors = {errors} />

                        {!isValid && <Text style = {[accentTextStyle, authStyle.errorText]}>{error}</Text>}
                        <View style = {arrowButtonStyle.buttonContainer}>
                            {step >= 2 && <Button disabled={!isValid} activity={goBack} buttonStyle = {[yelowButtonStyle.button, arrowButtonStyle.button]}><Image source = {ArrowLeft} style = {{width: 20, height: 20}}/></Button>}
                            {step < 3 && <Button disabled={!isValid} activity={goNext} buttonStyle = {[yelowButtonStyle.button, arrowButtonStyle.button]}><Image source = {ArrowRight} style = {{width: 20, height: 20}}/></Button>}
                            {step === 3 && 
                                <ButtonWithText
                                    activity={onRegistry} 
                                    text = 'Регистрация' 
                                    disabled = {!isValid} 
                                    buttonContainerStyle={yelowButtonStyle.button} 
                                    textStyle = {authStyle.textButton} />
                            }
                        </View>
                    </View>
                </View>
            </LinearGradient>
        </View>
    )
}

const arrowButtonStyle = StyleSheet.create({
    button: {
        padding: 10,
        borderRadius: 40
    },
    buttonContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

})

export default Registry;