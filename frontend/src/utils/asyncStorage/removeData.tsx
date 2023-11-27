import AsyncStorage from '@react-native-async-storage/async-storage';

export const removeData = async (key:string) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
        console.log(e)
    }
};