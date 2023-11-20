import { FC, memo } from "react";
import { imgURL } from "../../src/consts/const";
import { GroupType } from "../../src/types/GroupType";
import { StyleSheet, Text, View, Image } from "react-native";
import { PhotoImage } from "../../public/images";
import { HouseIcon } from "../../public/icons";

type GroupItemProps = {
    group: GroupType
}

const GroupItem: FC<GroupItemProps> = memo( function GroupItem({group}) {
    return(
        <View style = {groupItemStyle.container}>
            <View style = {groupItemStyle.imgContainer}>
                <Image source={group.img ? {uri: imgURL + group.img } : PhotoImage} style = {groupItemStyle.img} alt = {group.nameGroup} resizeMethod="resize" resizeMode="cover"/>
            </View>
            <View style = {groupItemStyle.info}>
                <View>
                    <Text style= {groupItemStyle.title}>{group.nameGroup}</Text>
                    <Text style={groupItemStyle.category}>Стиль {!!group.category ? group.category : '-'}</Text>
                </View>
                <View style = {groupItemStyle.address}>
                    <Image source={HouseIcon} alt = 'Адрес ' style = {{width: 20, height: 20}}/>
                    <View>
                        <Text style={groupItemStyle.text}>г. {group.cityGroup.city}</Text>
                        <Text style={groupItemStyle.text}>{group.addressGroup}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
})

const groupItemStyle = StyleSheet.create({
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
        height: 300,
        overflow: 'hidden',
    },
    img: {
        width: '100%',
        height: '100%',
        borderRadius: 6,
    },
    info: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        fontFamily: 'Inter-Medium',
        fontSize: 18,
        color: '#000',
        paddingTop: 10,
        overflow: 'hidden'
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
    address: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 10,
        paddingTop: 15
    },
})

export default GroupItem;