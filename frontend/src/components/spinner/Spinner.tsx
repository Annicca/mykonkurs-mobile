import { FC } from "react";
import { View,  ActivityIndicator, StyleSheet } from "react-native";

const Spinner: FC = () => {
    return (
        <View style = {spinnerStyle.container}>
            <ActivityIndicator size="large" color="#FF6B00" />
        </View> 
    )
}

const spinnerStyle = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default Spinner;