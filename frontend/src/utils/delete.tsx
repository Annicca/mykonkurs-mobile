import { Alert } from "react-native";
import { instance } from "./instance";

export const deleteFetch = (url: string, token: string | null | undefined, action: (data: any) => void = () => {}) => {
    
    instance.delete(url, {headers: {Authorization: `Bearer ${token}`}})
    .then((response) =>{
        action(response.data.content)
        Alert.alert('Успешно удалено');
    })
    .catch((error)=>{
        if(error.response){
            Alert.alert('Ошибка', error.response.data.message);
        } else{
            Alert.alert('Ошибка', "Мы не смогли удалить коллектив(");
        }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
    })
}