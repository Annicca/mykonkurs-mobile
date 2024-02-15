import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useUserContext } from '../context/UserContext';
import {View, Text, Alert, ScrollView, StyleSheet} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { CompetitionsParamList } from '../components/navigation/navBarCompetitions';
import { formStyle } from '../styles/form/formStyle';
import { mainContainerStyle } from '../styles/containers/MainContainer';
import InputControl from '../uikit/input/inputControl';
import { GroupType } from '../types/GroupType';
import ModalParticipants from '../components/modalParticipants/ModalParticipants';
import ButtonWithText from '../uikit/buttonWithText/ButtonWithText';
import { styleInput } from '../styles/input';
import { accentTextStyle } from '../styles/accentText/AccentText';
import { yelowButtonStyle } from '../styles/yellowButton/yellowButton';
import { instance } from '../utils/instance';
import { getRequestConfig } from '../utils/getRequestConfig';

const StatementParticipantFrom: FC<StackScreenProps<CompetitionsParamList, 'StatementParticipantFrom'>> = ({route, navigation}) => {

    const competition = route.params.competition;

    const {user, jwt} = useUserContext().context

    const [group, setGroup] = useState<GroupType>();

    const [isOpen, setIsOpen] = useState<boolean>(false);
    
    const {
        formState: {errors, isValid},
        handleSubmit,
        control
    } = useForm({
        mode: "onBlur"
    });

    const handleOpen = () => {
        setIsOpen(!isOpen)
    }

    const handleGroup = (group: GroupType) => {
        setGroup(group)
        handleOpen()
    }

    const onSubmitStatementParticipant = handleSubmit( async(data) => {
        let dataStatement  = {
            ...data,
            group: group,
            competition: competition,
            user: user
        }

        instance.post('statementsparticipant', dataStatement, getRequestConfig(jwt))
            .then(r => {
                Alert.alert('Успешно', '', [
                    {
                        text: 'OK', onPress: () => navigation.goBack()
                    }
                ]);
            })
            .catch(e => {
                if(e.response.data) {
                    Alert.alert('Ошибка', e.response.data.message)
                } else {
                    Alert.alert('Ошибка', 'Мы не смогли отправить данные(((')
                }
            })


    })
    
    return(
        <ScrollView>
            <View style={formStyle.centeredContainer}>
                <View style={[mainContainerStyle, participantFormStyle.formContainer]}>
                    <Text style={participantFormStyle.title}>Подать заявку на конкурс {competition.nameCompetition}</Text>
                    <View>
                        <Text style = {accentTextStyle}>*</Text>
                        <ButtonWithText activity={handleOpen} text={group ? group.nameGroup : ''} buttonContainerStyle = {[styleInput.input, {justifyContent: 'center'}]} textStyle={{color: '#888'}} />
                    </View>
                    <ModalParticipants handleGroup={handleGroup} handleOpen={handleOpen} isOpen = {isOpen} />
                    <InputControl 
                        control={control}
                        name='nameAct'
                        rules={{
                            required: 'Поле обязательно'
                        }}
                        error={errors.nameAct?.message}
                        placeholder='Название номера'/>
                    <InputControl
                        control={control}
                        name = 'countParticipants'
                        placeholder='Количество участников'
                        rules={{
                            required: 'Поле обязательно',
                            validate: {
                                includeNumber: (value) => /^\d+$/.test(value) || "Введите числовое значение",
                            }
                        }}
                        error={errors.countParticipants?.message} />
                    <ButtonWithText disabled={!isValid} activity={onSubmitStatementParticipant} text='Отправить' buttonContainerStyle={yelowButtonStyle.button} textStyle={yelowButtonStyle.textButton} />
                </View>
            </View>
        </ScrollView>
    )
}

const participantFormStyle = StyleSheet.create({
    formContainer: {
        width: '100%',
        rowGap: 20
    },
    title: {
        fontFamily: 'Inter-Medium',
        fontSize: 16,
        color: '#000'
    },
})

export default StatementParticipantFrom;