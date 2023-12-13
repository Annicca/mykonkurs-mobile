import {FC, memo} from 'react'
import { View, Text, Image, StyleSheet } from 'react-native';
import { CompetitionType } from "../../types/CompetitionType"
import { transformDate } from '../../utils/transformDate';
import TextIcon from '../../uikit/textIcon/TextIcon';
import { CalendarIcon } from '../../../public/icons';
import { mainContainerStyle } from '../../styles/containers/MainContainer';
import { tileStyle } from '../../styles/title/TitleStyle';
import { accentTextStyle } from '../../styles/accentText/AccentText';
import CustomImage from '../customImage/CustomImage';
import { chooseStatusCompetition } from '../../utils/chooseStatusCompetition';

type CompetitionItemProps = {
    competition: CompetitionType
}

const CompetitionItem: FC<CompetitionItemProps> = ({competition}) => {
    return(
        <View style = {[mainContainerStyle, competitionItemStyle.container]}>
            <CustomImage 
                source = {competition.img} 
                containerStyle = {competitionItemStyle.imgContainer} 
                alt = {competition.nameCompetition} />
            <View style = {competitionItemStyle.info}>
                <Text style= {[tileStyle, competitionItemStyle.title]}>{competition.nameCompetition}</Text>
                <Text style={accentTextStyle}>Город: {competition.cityCompetition.city}</Text>
            </View>
            <TextIcon styleIcon={{width: 20, height: 20}} iconName={CalendarIcon} text={transformDate(competition.dateStart) + ' - ' + transformDate(competition.dateFinish)}/>
            <Text style = {[accentTextStyle, competitionItemStyle.title]}>Статус: {chooseStatusCompetition(competition.statusCompetition)}</Text>
        </View>
    )
}

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

export default memo(CompetitionItem,
    (oldProps, newProps) => {
      if (
        oldProps.competition !== newProps.competition &&
        oldProps.competition.idCompetition !== newProps.competition.idCompetition &&
        oldProps.competition.nameCompetition !== newProps.competition.nameCompetition &&
        oldProps.competition.cityCompetition !== newProps.competition.cityCompetition
      ) {
        return true;
      }
      return false;
    });