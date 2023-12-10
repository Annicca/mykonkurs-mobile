import {FC} from 'react'
import { View, Text, Image, StyleSheet } from 'react-native';
import { AccountIcon } from '../../../public/icons';
import { tileStyle } from '../../styles/title/TitleStyle';

type FioUserProps = {
    name: string,
    surname: string,
    patronimic?: string
}

const FioUser: FC<FioUserProps> = ({name, surname, patronimic}) => {
    return (
        <View style = {styleFio.containerName}>
            <Image source={AccountIcon} style = {styleFio.icon} />
            <View>
                <Text style = {tileStyle}>{surname} {name}</Text>
                {patronimic && <Text style = {tileStyle}>{patronimic}</Text>}
            </View>
        </View>
    )
}

const styleFio = StyleSheet.create({
    containerName: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 10
    },
    icon: {
        height: 50,
        width: 50
    },
})

export default FioUser;