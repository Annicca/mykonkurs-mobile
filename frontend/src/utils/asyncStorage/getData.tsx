import AsyncStorage from '@react-native-async-storage/async-storage';

export const getData = async(key:string) => {
    try {
      const data = await AsyncStorage.getItem(key);
      return data
    } catch (e) {
        return null
    }
};