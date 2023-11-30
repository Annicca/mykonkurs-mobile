import { StyleSheet } from "react-native"
import { ViewStyle, TextStyle,  } from "react-native";

type Style = {
    gradient:ViewStyle,
    container: ViewStyle;
    title: TextStyle;
    link: TextStyle;
    form: ViewStyle;
    textButton: TextStyle;
    backButton: ViewStyle;
    backButtonText: TextStyle;
    errorText: TextStyle,
};

export const authStyle = StyleSheet.create<Style>({
    gradient: {
        width: '100%',
        height: '100%',
        alignItems: 'flex-start',
        paddingHorizontal: 30,
    },
    container: {
        width: '100%',
        alignItems: 'center',
        marginTop: '25%',
        paddingHorizontal: 30,
        paddingVertical: 30
    },
    title: {
        paddingBottom: 15,
        fontFamily: 'Inter-Bold',
        fontSize: 24,
        color: '#000'
    },
    link: {
        paddingBottom: 20,
        fontFamily: 'Inter-Regular',
        color: '#4F4F4F',
        fontSize: 16,
    },
    form: {
        width: '100%',
        alignItems: 'center',
        rowGap: 30
    },
    textButton: {
        fontFamily: 'Inter-Medium',
        fontSize: 16,
        color: '#FFF'
    },
    backButton : {
        marginTop: 40,
        backgroundColor: '#FFF',
        borderRadius: 15,
        padding: 10,
    },
    backButtonText : {
        fontFamily: 'Inter-Medium',
        fontSize: 14,
        color: '#000'
    },
    errorText: {
        width: '100%'
    }
})