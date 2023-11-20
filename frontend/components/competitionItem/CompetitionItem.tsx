import {FC, memo} from 'react'
import { View, Text, Image, StyleSheet } from 'react-native';
import { CompetitionType } from "../../src/types/CompetitionType"
import { PhotoImage } from '../../public/images';
import { imgURL } from '../../src/consts/const';
import { transformDate } from '../../src/utils/transformDate';
import TextIcon from '../textIcon/TextIcon';
import { CalendarIcon } from '../../public/icons';

type CompetitionItemProps = {
    competition: CompetitionType
}

const CompetitionItem: FC<CompetitionItemProps> = memo( function CompetitionItem({competition}) {
    return(
        <View style = {competitionItemStyle.container}>
            <View style = {competitionItemStyle.imgContainer}>
                <Image source={competition.img ? {uri: imgURL + competition.img } : PhotoImage} style = {competitionItemStyle.img} alt = {competition.nameCompetition} resizeMethod="resize" resizeMode="cover"/>
                <Text style = {competitionItemStyle.category}>Статус: {competition.statusCompetition}</Text>
            </View>
            <View >
                <View style = {competitionItemStyle.info}>
                    <Text style= {competitionItemStyle.title}>{competition.nameCompetition}</Text>
                    <Text style={competitionItemStyle.category}>Город: {competition.cityCompetition.city}</Text>
                </View>
                <TextIcon styleIcon={{width: 20, height: 20}} iconName={CalendarIcon} text={transformDate(competition.dateStart) + ' - ' + transformDate(competition.dateFinish)} textStyle={competitionItemStyle.text}/>
            </View>
        </View>
    )
})

const competitionItemStyle = StyleSheet.create({
    container: {
        display: 'flex',
        maxWidth: '100%',
        columnGap: 15,
        padding: 15,
        backgroundColor: '#FFF',
        borderRadius: 10,
        borderColor: 'rgba(136, 136, 136, 0.1);',
        borderWidth: 1,
    }, 
    imgContainer: {
        flex: 1,
        height: 180,
        overflow: 'hidden',
    },
    img: {
        width: '100%',
        height: '100%',
        borderRadius: 6,
    },
    info: {
        paddingBottom: 20,
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#BFBFBF'
    },
    title: {
        fontFamily: 'Inter-Medium',
        fontSize: 18,
        color: '#000',
        paddingTop: 10,
    },
    category: {
        fontFamily: 'Inter-Medium',
        fontSize: 14,
        color: '#FF6B00',
    },
    text: {
        fontFamily: 'Inter-Regular',
        fontSize: 14,
        color: '#000',
    },
})

export default CompetitionItem;