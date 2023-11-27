import {FC} from 'react';
import useFetch from '../hooks/useFetch';
import { View, Text } from "react-native"
import { ScrollView } from 'react-native-gesture-handler';
import { StackScreenProps } from '@react-navigation/stack';
import { CompetitionType } from '../types/CompetitionType';
import { CompetitionsParamList } from '../components/navigation/navBarCompetitions';
import { detailStyle as competitionStyle } from '../styles/detail/detail';
import { generalContainerStyle } from '../styles/containers/GeneralContainer';
import { bigTileStyle } from '../styles/title/BigTitle';
import { accentTextStyle } from '../styles/accentText/AccentText';
import ErrorMessage from '../components/errorMessage/ErrorMessage';
import Spinner from '../components/spinner/Spinner';
import Info from '../components/info/Info';
import ButtonGradient from '../uikit/buttonGradient/ButtonGradient';
import Description from '../components/description/Description';
import CustomImage from '../components/customImage/CustomImage';
import { chooseStatusCompetition } from '../utils/chooseStatusCompetition';

const Competition: FC<StackScreenProps<CompetitionsParamList, 'Competition'>> = ({navigation, route}) => {

    const {data: competition, loading, error} = useFetch<CompetitionType>(`${route.params.url}/${route.params.idCompetition}`)

    return (
        <ScrollView style = {generalContainerStyle}>
            {
                error ? <ErrorMessage message='Произошла ошибка' /> :
                loading ? <Spinner /> :
                !!competition && 
                <View style={competitionStyle.container}> 
                    <CustomImage 
                        source = {competition.img} 
                        containerStyle = {competitionStyle.imgContainer} 
                        alt = {competition.nameCompetition} />
                    <Text style = {[bigTileStyle, competitionStyle.title]}>{competition.nameCompetition}</Text>
                    <Text style = {accentTextStyle}>Город: {competition.cityCompetition.city}</Text>
                    <Info dateStart={competition.dateStart} dateFinish={competition.dateFinish} number={competition.organizer.phoneUser} mail={competition.organizer.phoneUser} />
                    <Text style = {[accentTextStyle, competitionStyle.title]}>Статус: {chooseStatusCompetition(competition.statusCompetition)}</Text>
                    <Description description={competition.descriptionCompetition} />
                    <ButtonGradient
                        action={() => navigation.navigate('StatementParticipantFrom', {idCompetition: competition.idCompetition})}
                        text = 'Подать заявку на участие'
                        containerStyle = {competitionStyle.containerButton} />
                </View>
            }
        </ScrollView>
    )
}

export default Competition;