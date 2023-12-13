import { FC, useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useFetchCity } from '../hooks/useFetchCity';
import { useUserContext } from '../context/UserContext';
import { StackScreenProps } from '@react-navigation/stack';
import { AccountParamList } from '../components/navigation/navBarAccount';
import { StatementType, UserRole } from '../consts/const';
import {View, ScrollView, Text, StyleSheet, Alert} from 'react-native';
import StatementFormInner from '../components/statementFormInner/StatementFormInner';
import Spinner from '../components/spinner/Spinner';
import ErrorMessage from '../components/errorMessage/ErrorMessage';
import ButtonWithText from '../uikit/buttonWithText/ButtonWithText';
import ArrowButton from '../components/arrowButton/ArrowButton';
import { RadioButtonProps } from 'react-native-radio-buttons-group/lib/types';
import RadioButtons from '../uikit/radioButton/RadioButton';
import { mainContainerStyle } from '../styles/containers/MainContainer';
import { formStyle } from '../styles/form/formStyle';
import { ArrowRight } from '../../public/icons';
import { yelowButtonStyle } from '../styles/yellowButton/yellowButton';
import { authStyle } from '../styles/auth/authStyle';
import { instance } from '../utils/instance';
import { getRequestConfig } from '../utils/getRequestConfig';

const StatementForm: FC<StackScreenProps<AccountParamList, 'StatementForm'>> = ({navigation}) => {

    const {user, jwt} = useUserContext().context;

    const [type, setType] = useState<string>(user && user.role === UserRole.ORGANIZER ? StatementType.COMETITION : user && user.role === UserRole.DIRECTOR ? StatementType.GROUP : '')

    const {loading, cities, error} = useFetchCity();

    const {
        formState: {errors, isValid},
        handleSubmit,
        control
    } = useForm({
        mode: "onBlur"
    });

    const radioButtons: RadioButtonProps[] = useMemo(() => ([
        {
            id: 'COMPETITION',
            label: 'Конкурс',
            value: 'COMPETITION',
        },
        {
            id: 'GROUP',
            label: 'Коллектив',
            value: 'GROUP'
        }
    ]),[])

    const onStatement = handleSubmit(async (data) => {
        let city = cities.find(c => c.value === data.city)
        let statement = {
            ...data,
            type: type,
            dateStart: data.dateStart ? data.dateStart.split('/').join('-') : null,
            dateFinish: data.dateStart ? data?.dateFinish.split('/').join('-') : null,
            city: {
                idCity: city?.id,
                city: city?.value
            },
        }

        await instance.post(`statements/${user?.idUser}`, JSON.stringify(statement), getRequestConfig(jwt))
            .then(() => navigation.navigate('MyStatements', {url:'statements'}))
            .catch((e) =>{ 
                if(e.response?.data.message) {
                    Alert.alert('Ошибка',e.response.data.message);
                 } else {
                    Alert.alert('Ошибка',"Что-топошло не так");
                }
            })
    })

    const goNext = handleSubmit((data) => {
        setType(data.type)
    })

    if(loading) return <Spinner />
    else if(error) return <ErrorMessage message={error} />
    else if(!user || user.role === UserRole.ADMIN) <ErrorMessage message={'Вы не можете разместить коллектив или конкурс. Пожалуйста авторизируйтесь или войдите с необходимой ролью'} />
    else return(
        <ScrollView>
            <View style={formStyle.centeredContainer}>
                <View style={[mainContainerStyle, formStyle.form]}>
                    <View style = {statementFormStyle.titleContainer}>
                        <Text style = {statementFormStyle.titleForm}>
                            {!type ? '1. Выберете тип заявки': type === StatementType.COMETITION ? '2. Заполните данные конкурса' : '2. Заполните данные коллектива'}
                        </Text>
                    </View>
                    <View style = {statementFormStyle.innerContainer}>
                        {!type ? 
                            <RadioButtons
                                radioButtons={radioButtons}
                                control={control}
                                name='type' 
                            /> :
                            <StatementFormInner control={control} errors={errors} type = {type} cities = {cities} />
                        }
                        <View style = {[formStyle.buttonContainer, statementFormStyle.submitContainer]}>
                            {!type ? 
                                <ArrowButton disabled={!isValid} activity={goNext} icon = {ArrowRight} /> :
                                <ButtonWithText
                                    activity={onStatement} 
                                    text = 'Отправить' 
                                    disabled = {!isValid} 
                                    buttonContainerStyle={[yelowButtonStyle.button, statementFormStyle.buttonSubmit]} 
                                    textStyle = {authStyle.textButton} />
                            }
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const statementFormStyle = StyleSheet.create({

    titleContainer: {
        width: '100%',
        backgroundColor: '#FFB800',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    titleForm: {
        color: '#FFF',
        fontFamily: 'Inter-Bold',
        fontSize: 16
    },
    innerContainer: {
        padding: 20,
        rowGap: 20
    },
    buttonSubmit: {
        paddingVertical: 10,
    },
    submitContainer: {
        justifyContent: 'flex-end'
    }
})

export default StatementForm;