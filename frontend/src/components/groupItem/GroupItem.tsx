import { FC, memo } from "react";
import { imgURL } from "../../consts/const";
import { GroupType } from "../../types/GroupType";
import { StyleSheet, Text, View, Image } from "react-native";
import { PhotoImage } from "../../../public/images";
import GroupAddress from "../groupAddress/GroupAddress";
import { mainContainerStyle } from "../../styles/containers/MainContainer";
import { imgStyle } from "../../styles/img/ImgStyle";
import { tileStyle } from "../../styles/title/TitleStyle";
import { accentTextStyle } from "../../styles/accentText/AccentText";

type GroupItemProps = {
    group: GroupType
}

const GroupItem: FC<GroupItemProps> = memo( function GroupItem({group}) {
    return(
        <View style= {[mainContainerStyle, groupItemStyle.container]}>
            <View style = {groupItemStyle.imgContainer}>
                <Image source={group.img ? {uri: imgURL + group.img } : PhotoImage} style = {imgStyle} alt = {group.nameGroup} resizeMethod="resize" resizeMode="cover"/>
            </View>
            <View style = {groupItemStyle.info}>
                <View>
                    <Text style= {[tileStyle, groupItemStyle.title]}>{group.nameGroup}</Text>
                    <Text style={accentTextStyle}>Стиль {!!group.category ? group.category : '-'}</Text>
                </View>
                <GroupAddress address={group.addressGroup} city={group.cityGroup.city} />
            </View>
        </View>
    )
})

const groupItemStyle = StyleSheet.create({
    container: {
        padding: 15,
    },
    imgContainer: {
        flex: 1,
        height: 300,
        overflow: 'hidden',
    },
    info: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        paddingTop: 10,
    },
})

export default GroupItem;