import {FC, memo} from 'react'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { AccountParamList } from '../navigation/navBarAccount'
import { View, Text} from 'react-native'
import { CompetitionType } from '../../types/CompetitionType'
import { mainContainerStyle } from '../../styles/containers/MainContainer'
import TitleContainerItem from '../titleContainerItem/TitleContainerItem'
import CustomImage from '../customImage/CustomImage'
import TextIcon from '../../uikit/textIcon/TextIcon'
import Button from '../../uikit/button/button'
import DescriptionItem from '../descriptionItem/DescriptionItem'
import { accentTextStyle } from '../../styles/accentText/AccentText'
import { chooseStatusCompetition } from '../../utils/chooseStatusCompetition'
import { transformDate } from '../../utils/transformDate'
import { CalendarIcon, GroupsIcon, StatementIcon } from '../../../public/icons'
import { minyItemStyle } from '../../styles/minyItem/minyItemStyle'
import { textStyle } from '../../styles/text/textStyle'
import { useUserContext } from '../../context/UserContext'
import { UserRole } from '../../consts/const'

type MyGroupItemProps = {
    competition: CompetitionType,
    deleteItem?: () => void ,
    toChangeItem?: () => void 
}

const MyCompetitionItem: FC<MyGroupItemProps> = ({competition, deleteItem, toChangeItem}) => {

    const user = useUserContext().context.user

    const navigation = useNavigation<StackNavigationProp<AccountParamList>>()

    return(
        <View style={[mainContainerStyle, minyItemStyle.mainContainer]}>
            <TitleContainerItem name={competition.nameCompetition} actionTrash={deleteItem} actionChange={toChangeItem} />
            <View style = {minyItemStyle.container}>
                <CustomImage source={competition.img} containerStyle={minyItemStyle.imgContainer} alt={competition.nameCompetition}/>
                <View style={{rowGap: 5}}>
                    <Text style={accentTextStyle}>Статус: </Text>
                    <Text style={accentTextStyle}>{!!competition.statusCompetition ? chooseStatusCompetition(competition.statusCompetition) : '-'}</Text>
                    <Text style={textStyle}>Город:</Text>
                    <Text style={textStyle}>{competition.cityCompetition.city}</Text>
                    <TextIcon styleIcon={{width: 20, height: 20}} iconName={CalendarIcon} text={transformDate(competition.dateStart) + ' - '}/>
                    <Text style = {textStyle}>{transformDate(competition.dateFinish)}</Text>
                </View>
            </View>
            {user?.role === UserRole.ORGANIZER &&
                <View style = {minyItemStyle.container}>
                    <Button activity={() => navigation.navigate('Participants', {competitionId: competition.idCompetition})} buttonStyle={minyItemStyle.link}>
                        <TextIcon iconName={GroupsIcon} styleIcon={{width: 20, height: 20}} text='Участники  ->' colorIcon='#FF6B00' styleText = {accentTextStyle} />
                    </Button>
                    <Button activity={() => navigation.navigate('StatementParticipant', {urlPoint: `statementsparticipant/competition/${competition.idCompetition}`})} buttonStyle={minyItemStyle.link}>
                        <TextIcon iconName={StatementIcon} styleIcon={{width: 20, height: 20}} text='Заявки  ->' colorIcon='#FF6B00' styleText = {accentTextStyle} />
                    </Button>
                </View>
            }
            <DescriptionItem description={competition.descriptionCompetition} />
        </View>
    )
}

export default memo(MyCompetitionItem,
    (oldProps, newProps) => {
      if (
        oldProps.competition !== newProps.competition &&
        oldProps.competition.idCompetition !== newProps.competition.idCompetition &&
        oldProps.competition.nameCompetition !== newProps.competition.nameCompetition &&
        oldProps.competition.cityCompetition.city !== newProps.competition.cityCompetition.city &&
        oldProps.competition.dateStart !== newProps.competition.dateStart &&
        oldProps.competition.dateFinish !== newProps.competition.dateFinish &&
        oldProps.competition.descriptionCompetition !== newProps.competition.descriptionCompetition
      ) {
        return true;
      }
      return false;
    });