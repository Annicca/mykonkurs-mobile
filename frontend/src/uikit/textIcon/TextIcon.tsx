import { FC } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { ArrowIcon } from '../../../public/icons';
import { textStyle } from '../../styles/text/textStyle';

type TextIconProps = {
    text: string,
    iconName: any,
    transition?: boolean,
    border?: boolean,
    styleIcon: {
        width: number,
        height: number
    }
}

const TextIcon: FC<TextIconProps> = ({text, iconName, transition = false, border = false, styleIcon}) => {
    return(
        <View style = {border? [textIconStyle.container, textIconStyle.border] : textIconStyle.container}>
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
    },
    border: {
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor:'rgba(136, 136, 136, 0.1);',
    }
})

export default TextIcon;