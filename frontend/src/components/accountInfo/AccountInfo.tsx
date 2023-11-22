import { FC } from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import { AccountIcon, EmailIcon, PhoneIcon } from '../../../public/icons';
import TextIcon from '../textIcon/TextIcon';
import { UserRole } from '../../consts/const';
import { getRoleUser } from '../../utils/getRoleUser';
import { tileStyle } from '../../styles/title/TitleStyle';
import { accentTextStyle } from '../../styles/accentText/AccentText';
import { mainContainerStyle } from '../../styles/containers/MainContainer';

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
        <View style = {[mainContainerStyle, infoStyle.container]}>
            <View style = {infoStyle.containerName}>
                <Image source={AccountIcon} style = {infoStyle.icon} />
                <View>
                    <Text style = {tileStyle}>{surname} {name}</Text>
                    <Text style = {tileStyle}>{patronimic}</Text>
                </View>
            </View>
            <Text style = {accentTextStyle}>{ getRoleUser(role)}</Text>
            <View style = {infoStyle.containerInfo}>
                <TextIcon iconName={PhoneIcon} text = {phone} styleIcon = {{width: 20, height: 16}} />
                <TextIcon iconName={EmailIcon} text = {mail} styleIcon = {{width: 20, height: 16}} />
            </View>

        </View>
    )
}

const infoStyle = StyleSheet.create({
    container: {
        padding: 20,
        marginTop: 50,
        marginHorizontal: 20,
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
    icon: {
        height: 50,
        width: 50
    },
})

export default AccountInfo;