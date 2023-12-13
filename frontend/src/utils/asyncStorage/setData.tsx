import AsyncStorage from '@react-native-async-storage/async-storage';

export const setData = async(key: string, value: any) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch(e) {
    }
}