import { FC } from 'react';
import {View, Text, StyleSheet, Image, TextStyle, StyleProp} from 'react-native';
import { AccountIcon, EmailIcon, PhoneIcon } from '../../public/icons';
import TextIcon from '../textIcon/TextIcon';
import { UserRole } from '../../src/consts/const';
import { getRoleUser } from '../../src/utils/getRoleUser';

type AccountInfoProps = {
    surname: string,
    name: string,
    patronimic: string,
    role: UserRole,
    mail: string,
    phone: string
}

const AccountInfo: FC<AccountInfoProps> = ({surname, name, patronimic, role, mail, phone}) => {
    return(
        <View style = {infoStyle.container}>
            <View style = {infoStyle.containerName}>
                <Image source={AccountIcon} style = {infoStyle.icon} />
                <View>
                    <Text style = {infoStyle.mainText}>{surname} {name}</Text>
                    <Text style = {infoStyle.mainText}>{patronimic}</Text>
                </View>
            </View>
            <Text style = {infoStyle.roletext}>{ getRoleUser(role)}</Text>
            <View style = {infoStyle.containerInfo}>
                <TextIcon iconName={PhoneIcon} text = {phone} textStyle = {infoStyle.smalltext} styleIcon = {{width: 20, height: 16}} />
                <TextIcon iconName={EmailIcon} text = {mail} textStyle = {infoStyle.smalltext} styleIcon = {{width: 20, height: 16}} />
            </View>

        </View>
    )
}

const infoStyle = StyleSheet.create({
    container: {
        flexDirection: 'column',
        padding: 20,
        marginTop: 50,
        marginHorizontal: 20,
        borderRadius: 10,
        backgroundColor: '#FFF',
        elevation: 8,
        shadowColor: '#000',
    },
    containerName: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 10
    },
    containerInfo: {
        paddingTop: 20,
        rowGap: 15
    },
    roletext: {
        color: '#FF6B00',
        fontSize: 14,
        fontFamily: 'Inter-Medium',
    },
    icon: {
        height: 50,
        width: 50
    },
    mainText: {
        fontFamily: 'Inter-Medium',
        fontSize: 18,
        color: '#000'
    },
    smalltext: {
        fontFamily: 'Inter-Regular',
        fontSize: 14,
        color: '#000'
    }
})

export default AccountInfo;