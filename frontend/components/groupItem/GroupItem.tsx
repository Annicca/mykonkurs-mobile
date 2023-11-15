import { FC } from "react";
import { GroupType } from "../../src/types/GroupType";
import { StyleSheet, Text, View, Image } from "react-native";
import { PhotoImage } from "../../public/images";

type GroupItemProps = {
    group: GroupType
}

const urlSrc = 'http://192.168.56.1:8080/img/'

const GroupItem:FC<GroupItemProps> = ({group}) => {
    return(
        <View style = {groupItemStyle.container}>
            <View style = {groupItemStyle.imgContainer}>
                <Image source={group.img ? {uri: urlSrc + group.img } : PhotoImage} style = {groupItemStyle.img} resizeMethod="resize" resizeMode="contain"/>
            </View>
            
            <Text>{group.nameGroup}</Text>
        </View>
    )
}

const groupItemStyle = StyleSheet.create({
    container: {
        width: '100%',
        padding: 10,
        backgroundColor: '#FFF',
        borderRadius: 10,
        elevation: 8,
        shadowColor: '#000',
    },
    imgContainer: {
        maxWidth: 125,
        height: 90,
        overflow: 'hidden',
    },
    img: {
        width: '100%',
        height: '100%',
        borderRadius: 6,
    }
})

export default GroupItem;