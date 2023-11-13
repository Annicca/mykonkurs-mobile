import { FC } from 'react';
import { View, Text, Image, StyleSheet, StyleProp, TextStyle } from 'react-native';
import { ArrowIcon } from '../../public/icons';

type TextIconProps = {
    text: string,
    textStyle: object,
    iconName: any,
    transition?: boolean,
    styleIcon: {
        width: number,
        height: number
    }
}

const TextIcon: FC<TextIconProps> = ({text, textStyle, iconName, transition = false, styleIcon}) => {
    return(
        <View style = {textIconStyle.container}>
            <View style = {textIconStyle.containerImg}>
                <Image source={iconName} style = {styleIcon} resizeMode='contain' />
                <Text style = {textStyle}>{text}</Text>
            </View>
            {transition && <Image source={ArrowIcon} style = {textIconStyle.arrow} />}
        </View>
    )
}

const textIconStyle = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    containerImg : {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        columnGap: 10,
    },
    icon: {
        width: 18,
        height: 14
    },
    arrow: {
        width: 10,
        height: 10
    }
})

export default TextIcon;