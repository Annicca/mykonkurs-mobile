import {FC, useState, memo} from 'react'
import { useUserContext } from '../../context/UserContext';
import { StatementParticipantType } from '../../types/StatementParticipanttype'
import { View, Text, StyleSheet } from 'react-native';
import { mainContainerStyle } from '../../styles/containers/MainContainer';
import TextIcon from '../../uikit/textIcon/TextIcon';
import { CompetitionsIcon, GroupsIcon, StatementIcon, CalendarIcon } from '../../../public/icons';
import { accentTextStyle } from '../../styles/accentText/AccentText';
import { textStyle } from '../../styles/text/textStyle';
import CustomImage from '../customImage/CustomImage';
import StatementTitle from '../statementTitle/StatementTitle';
import { chooseStatusCompetition } from '../../utils/chooseStatusCompetition';
import { transformDate } from '../../utils/transformDate';
import { StatementStatus, UserRole } from '../../consts/const';
import ButtonWithText from '../../uikit/buttonWithText/ButtonWithText';
import { yelowButtonStyle } from '../../styles/yellowButton/yellowButton';
import { changeStatus } from '../../utils/changeStatus';
import { confirm } from '../../utils/confirm';


type StatementParticipantItemProps = {
    statementInit: StatementParticipantType,
    role?: UserRole
}

const StatementParticipantItem : FC<StatementParticipantItemProps> = ({statementInit, role}) => {

    const [statement, setStatement] = useState<StatementParticipantType>(statementInit);

    const jwt = useUserContext().context.jwt

    const changeStatementStatus = (id: number, status: string ) => {
        confirm('Вы действительно хотите изменить статус?', () =>
        changeStatus(`statementsparticipant/${status}/${id}`, status, setStatement, jwt))
    }

    return(
        <View style = {[mainContainerStyle, statementStyle.container]}>
            <StatementTitle number={statement.id} status={statement.status} />
            <View style={statementStyle.container}>
                <TextIcon text={statement.group.nameGroup} iconName={GroupsIcon} colorIcon= '#FF6B00' styleText={accentTextStyle} styleIcon={{width: 20, height: 20}} />
                <View style={statementStyle.containerGroup}>
                    <CustomImage 
                    source = {statement.group.img} 
                    containerStyle = {statementStyle.imgContainer} 
                    alt = {statement.group.nameGroup} />
                    <View style={statementStyle.groupInfo}>
                        <Text style={textStyle}>Название номера:</Text>
                        <Text style={[textStyle, {flexWrap: 'wrap'}]}>{statement.nameAct}</Text>
                        <Text style={textStyle}>Участники:</Text>
                        <Text style={[textStyle, statementStyle.count]}>{statement.countParticipants}</Text>
                    </View>
                </View>
                {role && role === UserRole.DIRECTOR &&
                    <>
                        <TextIcon text={statement.competition.nameCompetition} iconName={CompetitionsIcon} colorIcon= '#FF6B00' styleText={accentTextStyle} styleIcon={{width: 20, height: 20}} />
                        <View style={statementStyle.containerGroup}>
                            <CustomImage 
                            source = {statement.competition.img} 
                            containerStyle = {statementStyle.imgContainer} 
                            alt = {statement.competition.nameCompetition} />
                            <View style={statementStyle.groupInfo}>
                                <TextIcon styleIcon={{width: 20, height: 20}} iconName={CalendarIcon} text={transformDate(statement.competition.dateStart) + ' - ' + transformDate(statement.competition.dateFinish)}/>
                                <Text style = {accentTextStyle}>Статус:</Text>
                                <Text style = {accentTextStyle}>{chooseStatusCompetition(statement.competition.statusCompetition)}</Text>
                            </View>
                        </View>
                    </>
                }

                {role && role === UserRole.ORGANIZER &&
                    <View style={statementStyle.containerGroup}>
                        <ButtonWithText 
                        disabled = {!!statement.status}
                        activity={() => changeStatementStatus(statement.id, 'reject')} 
                        text='Отклонить' 
                        textStyle={yelowButtonStyle.textButton} 
                        buttonContainerStyle={[yelowButtonStyle.button, statementStyle.button]}/>
                        <ButtonWithText 
                        disabled = {!!statement.status}
                        activity={() => changeStatementStatus(statement.id, 'accept')} 
                        text='Принять' 
                        textStyle={yelowButtonStyle.textButton} 
                        buttonContainerStyle={[yelowButtonStyle.button, statementStyle.button]}/>
                    </View>
                }
            </View>
        </View>
    )
}

const statementStyle = StyleSheet.create({
    container: {
        rowGap: 20
    },
    imgContainer: {
        width: 150,
        height: 120,
        overflow: 'hidden',
    },
    containerGroup: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        columnGap: 20,
    },
    groupInfo: {
        justifyContent: 'flex-start',
        alignItems: "flex-start",
        rowGap: 5
    },
    count: {
        borderRadius: 15,
        backgroundColor: '#FF6B00',
        padding: 5,
        flexBasis: 1,
        color: '#FFF'
    },
    button: {
        backgroundColor: '#FF6B00'
    }
})

export default memo(StatementParticipantItem,
    (oldProps, newProps) => {
      if (
        oldProps.statementInit !== newProps.statementInit &&
        oldProps.statementInit.id !== newProps.statementInit.id
      ) {
        return true;
      }
      return false;
    });;