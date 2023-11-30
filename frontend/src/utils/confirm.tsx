import { Alert } from "react-native"

export const confirm = (action: () => void) => {
    Alert.alert('Подтвердите действие', "Вы действительно хотите удалить коллектив?", [
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