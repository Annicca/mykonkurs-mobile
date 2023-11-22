import {FC, memo} from 'react'
import { View, Text, Image, StyleSheet } from 'react-native';
import { CompetitionType } from "../../types/CompetitionType"
import { PhotoImage } from '../../../public/images';
import { imgURL } from '../../consts/const';
import { transformDate } from '../../utils/transformDate';
import TextIcon from '../textIcon/TextIcon';
import { CalendarIcon } from '../../../public/icons';
import { mainContainerStyle } from '../../styles/containers/MainContainer';
import { imgStyle } from '../../styles/img/ImgStyle';
import { tileStyle } from '../../styles/title/TitleStyle';
import { accentTextStyle } from '../../styles/accentText/AccentText';

type CompetitionItemProps = {
    competition: CompetitionType
}

const CompetitionItem: FC<CompetitionItemProps> = memo( function CompetitionItem({competition}) {
    return(
        <View style = {[mainContainerStyle, competitionItemStyle.container]}>
            <View style = {competitionItemStyle.imgContainer}>
                <Image source={competition.img ? {uri: imgURL + competition.img } : PhotoImage} style = {imgStyle} alt = {competition.nameCompetition} resizeMethod="resize" resizeMode="cover"/>
                <Text style = {accentTextStyle}>Статус: {competition.statusCompetition}</Text>
            </View>
            <View >
                <View style = {competitionItemStyle.info}>
                    <Text style= {[tileStyle, competitionItemStyle.title]}>{competition.nameCompetition}</Text>
                    <Text style={accentTextStyle}>Город: {competition.cityCompetition.city}</Text>
                </View>
                <TextIcon styleIcon={{width: 20, height: 20}} iconName={CalendarIcon} text={transformDate(competition.dateStart) + ' - ' + transformDate(competition.dateFinish)}/>
            </View>
        </View>
    )
})

const competitionItemStyle = StyleSheet.create({
    container: {
        padding: 15,
    }, 
    imgContainer: {
        flex: 1,
        height: 180,
        overflow: 'hidden',
    },
    info: {
        paddingBottom: 20,
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#BFBFBF'
    },
    title: {
        paddingTop: 10,
    },
})

export default CompetitionItem;