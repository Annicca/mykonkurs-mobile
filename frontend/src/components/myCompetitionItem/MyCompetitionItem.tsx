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
import { CalendarIcon, GroupsIcon } from '../../../public/icons'
import { minyItemStyle } from '../../styles/minyItem/minyItemStyle'
import { textStyle } from '../../styles/text/textStyle'

type MyGroupItemProps = {
    competition: CompetitionType,
    deleteItem?: () => void ,
    toChangeItem?: () => void 
}

const MyCompetitionItem: FC<MyGroupItemProps> = ({competition, deleteItem, toChangeItem}) => {

    const navigation = useNavigation<StackNavigationProp<AccountParamList>>()

    return(
        <View style={[mainContainerStyle, minyItemStyle.mainContainer]}>
            <TitleContainerItem name={competition.nameCompetition} actionTrash={deleteItem} actionChange={toChangeItem} />
            <View style = {minyItemStyle.container}>
                <CustomImage source={competition.img} containerStyle={minyItemStyle.imgContainer} alt={competition.nameCompetition}/>
                <View>
                    <Text style={accentTextStyle}>Статус {!!competition.statusCompetition ? chooseStatusCompetition(competition.statusCompetition) : '-'}</Text>
                    <TextIcon styleIcon={{width: 20, height: 20}} iconName={CalendarIcon} text={transformDate(competition.dateStart) + ' - '}/>
                    <Text style = {textStyle}>{transformDate(competition.dateFinish)}</Text>
                </View>
            </View>
            <Button activity={() => navigation.navigate('Participants', {competitionId: competition.idCompetition})} buttonStyle={minyItemStyle.link}>
                <TextIcon iconName={GroupsIcon} styleIcon={{width: 20, height: 20}} text='Участники  ->' colorIcon='#FF6B00' styleText = {accentTextStyle} />
            </Button>
            <DescriptionItem description={competition.descriptionCompetition} />
        </View>
    )
}

export default memo(MyCompetitionItem,
    (oldProps, newProps) => {
      if (
        oldProps.competition !== newProps.competition &&
        oldProps.competition.idCompetition !== newProps.competition.idCompetition
      ) {
        return true;
      }
      return false;
    });