import { StyleSheet } from "react-native"
import { ViewStyle } from "react-native";

type Style = {
    mainContainer: ViewStyle,
    container: ViewStyle;
    imgContainer: ViewStyle;
    link: ViewStyle;
};

export const minyItemStyle = StyleSheet.create<Style>({
    mainContainer: {
        rowGap: 10,
        alignItems: 'flex-start'
    },
    container : {
        flexDirection: 'row',
        columnGap: 20,
        alignItems: 'center'
    },
    imgContainer: {
        width: 150,
        height: 100
    },
    link: {
        padding: 10,
        width: 150,
        borderWidth: 1,
        borderColor: '#FF6B00',
        borderRadius: 10,
    }
})