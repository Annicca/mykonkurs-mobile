import { FC } from "react";
import { StyleSheet, View, Text } from "react-native";
import { mainContainerStyle } from "../../styles/containers/MainContainer";
import TextIcon from "../../uikit/textIcon/TextIcon";
import { CalendarIcon, EmailIcon, HouseIcon, PhoneIcon } from "../../../public/icons";
import { transformDate } from "../../utils/transformDate";
import { tileStyle } from "../../styles/title/TitleStyle";

type InfoProps = {
    dateStart? : string,
    dateFinish? : string,
    number?: string,
    address?: string,
    mail?: string
}

const Info: FC<InfoProps> = ({dateStart, dateFinish, number, address, mail}) => {
    return(
        <View style = {[mainContainerStyle, infoStyle.container]}>
            {!!dateStart && !!dateFinish &&
                <View style = {infoStyle.containerItems}>
                    <Text style = {tileStyle}>Дата проведения</Text>
                    <TextIcon iconName={CalendarIcon} text={`${transformDate(dateStart)} - ${transformDate(dateFinish)}`} styleIcon={{width: 20, height: 20}}  />
                </View>
            }
            <View style = {infoStyle.containerItems}>
                <Text style = {tileStyle}>Контакты</Text>
                {!!address && <TextIcon iconName={HouseIcon} text={address} styleIcon={{width: 20, height: 20}}  />}
                {!!number && <TextIcon iconName={PhoneIcon} text={number} styleIcon={{width: 20, height: 20}}  />}
                {!!mail && <TextIcon iconName={EmailIcon} text={mail} styleIcon={{width: 20, height: 20}}  />}
            </View>
        </View>
    )
}

const infoStyle = StyleSheet.create({
    container: {
        backgroundColor: '#FFF8EE',
        marginHorizontal: 0,
        marginTop: 20,
        rowGap: 20
    },
    containerItems: {
        rowGap: 10
    }
})

export default Info;