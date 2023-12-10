import {Dispatch, SetStateAction} from 'react';
import {Alert} from 'react-native';
import { StatementType } from '../types/StatementType';
import { instance } from './instance';
import { getRequestConfig } from './getRequestConfig';

export const changeStatus = async(url: string, status: string, setStatement: Dispatch<SetStateAction<any>>, token: string | null | undefined) => {
  await instance.put(url, {},  getRequestConfig(token) )
    .then((result) => {
      console.log(result.data);
      setStatement(result.data);
      Alert.alert("Успешно");
    })
    .catch((error) =>{ 
      console.log(error);
      if(error.response.data){
        Alert.alert('Ошибка', error.response.data.message)
     }else{
       Alert.alert('Ошибка', "Ошибка при изменении статуса заявки. Возможно данные заявки некорректны");
      }
    })
}