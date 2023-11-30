import { FC } from "react";
import {View, Text, Image, StyleSheet} from 'react-native';
import { HouseIcon } from "../../../public/icons";
import { textStyle } from "../../styles/text/textStyle";

type GroupAddressProps = {
    address: string,
    city: string
}

const GroupAddress : FC<GroupAddressProps> = ({address, city}) => {
    return (
        <View style = {styleAddress.container}>
            <Image source={HouseIcon} alt = 'Адрес ' style = {{width: 20, height: 20}}/>
            <View>
                <Text style={textStyle}>г. {city}</Text>
                <Text style={textStyle}>{address}</Text>
            </View>
        </View>
    )
}

const styleAddress = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 10,
        paddingTop: 10
    }
})

export default GroupAddress;