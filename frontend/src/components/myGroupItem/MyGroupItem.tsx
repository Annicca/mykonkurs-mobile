import {FC, memo} from 'react'
import { View, Text, StyleSheet, Image} from 'react-native'
import { GroupType } from '../../types/GroupType'
import CustomImage from '../customImage/CustomImage'
import GroupAddress from '../groupAddress/GroupAddress'
import DescriptionItem from '../descriptionItem/DescriptionItem'
import { mainContainerStyle } from '../../styles/containers/MainContainer'
import { accentTextStyle } from '../../styles/accentText/AccentText'
import { minyItemStyle } from '../../styles/minyItem/minyItemStyle'
import { CompetitionsIcon, EditIcon, TrashIcon } from '../../../public/icons'
import TextIcon from '../../uikit/textIcon/TextIcon'
import Button from '../../uikit/button/button'
import { useNavigation } from '@react-navigation/native'
import { AccountParamList } from '../navigation/navBarAccount'
import { StackNavigationProp } from '@react-navigation/stack'
import TitleContainerItem from '../titleContainerItem/TitleContainerItem'


type MyGroupItemProps = {
    group: GroupType,
    deleteItem?: () => void,
    toChangeItem?: () => void
}

const MyGroupItem: FC<MyGroupItemProps> = ({group, deleteItem, toChangeItem}) => {

    const navigation = useNavigation<StackNavigationProp<AccountParamList>>()

    return(
        <View style = {[mainContainerStyle, minyItemStyle.mainContainer]}>
            <TitleContainerItem name={group.nameGroup} actionTrash={deleteItem} actionChange={toChangeItem} />
            <View style = {minyItemStyle.container}>
                <CustomImage source={group.img} containerStyle={minyItemStyle.imgContainer} alt={group.nameGroup}/>
                <View>
                    <Text style={accentTextStyle}>Стиль: {!!group.category ? group.category : '-'}</Text>
                    <GroupAddress address={group.addressGroup} city={group.cityGroup.city} />
                </View>
            </View>
            <Button activity={() => navigation.navigate('CompetitionsGroup', {})} buttonStyle={minyItemStyle.link}>
                <TextIcon iconName={CompetitionsIcon} styleIcon={{width: 20, height: 20}} text='Конкурсы  ->' colorIcon='#FF6B00' styleText = {accentTextStyle} />
            </Button>
            <DescriptionItem description={group.descriptionGroup} />
        </View>
    )
}

export default memo(MyGroupItem,
    (oldProps, newProps) => {
      if (
        oldProps.group !== newProps.group &&
        oldProps.group.idGroup !== newProps.group.idGroup
      ) {
        return true;
      }
      return false;
    });