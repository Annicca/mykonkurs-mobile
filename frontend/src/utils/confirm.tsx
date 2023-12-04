import { Alert } from "react-native"

export const confirm = (message: string, action: () => void) => {
    Alert.alert('Подтвердите действие', message, [
        {
            text: 'Отменить',
            onPress: () => {return}
        },
        {
            text: 'Ок',
            onPress: () => action()
        }
    ])
}