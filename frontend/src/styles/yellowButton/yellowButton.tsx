import { StyleSheet } from "react-native"
import { ViewStyle, TextStyle } from "react-native";

type YellowButtonStyle = {
    button:ViewStyle,
    textButton: TextStyle;
};

export const yelowButtonStyle = StyleSheet.create<YellowButtonStyle>({
    button: {
        backgroundColor: '#FFD700',
        borderRadius: 15,
        paddingVertical: 15,
        paddingHorizontal: 20,
        alignItems: 'center',
        borderColor: 'rgba(136, 136, 136, 0.1);',
        borderWidth: 1,
    },
    textButton: {
        fontFamily: 'Inter-Bold',
        color: '#FFF'
    }
})