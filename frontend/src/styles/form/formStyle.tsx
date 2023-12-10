import { StyleSheet } from "react-native"
import { ViewStyle } from "react-native";

type Style = {
    buttonContainer: ViewStyle;
    centeredContainer: ViewStyle;
    form: ViewStyle;
};

export const formStyle = StyleSheet.create<Style>({
    buttonContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    centeredContainer : {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 50,
        marginBottom: 100
    },
    form: {
        width: '100%',
        padding: 0
    },
})