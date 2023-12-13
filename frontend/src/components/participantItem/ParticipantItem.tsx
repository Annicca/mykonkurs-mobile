import {FC, memo} from 'react';
import { GroupType } from "../../types/GroupType"
import {View, Text} from 'react-native';
import TitleContainerItem from '../titleContainerItem/TitleContainerItem';
import GroupAddress from '../groupAddress/GroupAddress';
import CustomImage from '../customImage/CustomImage';
import { mainContainerStyle } from '../../styles/containers/MainContainer';
import { minyItemStyle } from '../../styles/minyItem/minyItemStyle';
import { accentTextStyle } from '../../styles/accentText/AccentText';

type ParticipantItemProps = {
    participant: GroupType
}

const ParticipantItem: FC<ParticipantItemProps> = ({participant}) => {
    return(
        <View style = {[mainContainerStyle, minyItemStyle.mainContainer]}>
            <TitleContainerItem name={participant.nameGroup} />
            <View style = {minyItemStyle.container}>
                <CustomImage source={participant.img} containerStyle={minyItemStyle.imgContainer} alt={participant.nameGroup}/>
                <View>
                    <Text style={accentTextStyle}>Стиль: {!!participant.category ? participant.category : '-'}</Text>
                    <GroupAddress address={participant.addressGroup} city={participant.cityGroup.city} />
                </View>
            </View>
        </View>
    )
}

export default memo(ParticipantItem,
    (oldProps, newProps) => {
      if (
        oldProps.participant !== newProps.participant &&
        oldProps.participant.idGroup !== newProps.participant.idGroup
      ) {
        return true;
      }
      return false;
    });;