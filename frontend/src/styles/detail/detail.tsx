import { StyleSheet } from "react-native"
import { ViewStyle, TextStyle,  } from "react-native";

type Style = {
    container: ViewStyle;
    title: TextStyle;
    imgContainer: ViewStyle;
    containerButton: ViewStyle;
};

export const detailStyle = StyleSheet.create<Style>({
    container: {
        paddingBottom: 90
    },
    imgContainer: {
        paddingTop: 40,
        height: 300
    },
    title: {
        paddingTop: 15
    },

    containerButton: {
        marginVertical: 20
    }
})