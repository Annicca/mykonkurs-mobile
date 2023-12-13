import {StyleSheet, ViewStyle, TextStyle} from 'react-native'

type StyleInputType = {
    input: ViewStyle,
    focused: ViewStyle,
    error: TextStyle,
    textarea: ViewStyle
}

export const styleInput = StyleSheet.create<StyleInputType>({
    input: {
        height: 40,
        width: '100%',
        paddingLeft: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#FFD700',
        backgroundColor: '#FFF',
        color: '#888',
    },
    focused: {
        borderColor: '#FFB800'
    },
    error: {
        paddingTop: 10,
        fontFamily: 'Inter-Regular',
        fontSize: 14,
        color: '#FF6B00'
    },
    textarea:{
        height: 300,
    }
})