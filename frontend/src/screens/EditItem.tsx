import {FC} from 'react';
import useFetch from '../hooks/useFetch';
import { useUserContext } from '../context/UserContext';
import { useFetchCity } from '../hooks/useFetchCity';
import { useForm } from 'react-hook-form';
import { StackScreenProps } from '@react-navigation/stack';
import { AccountParamList } from '../components/navigation/navBarAccount';
import { CompetitionType } from '../types/CompetitionType';
import { GroupType } from '../types/GroupType';
import {View, Alert, ScrollView, StyleSheet} from 'react-native';
import Spinner from '../components/spinner/Spinner';
import ErrorMessage from '../components/errorMessage/ErrorMessage';
import StatementFormInner from '../components/statementFormInner/StatementFormInner';
import { StatementType as TStatement } from '../types/StatementType';
import { StatementType } from '../consts/const';
import { mainContainerStyle } from '../styles/containers/MainContainer';
import ButtonSave from '../uikit/buttonSave/ButtonSave';
import { confirm } from '../utils/confirm';
import { instance } from '../utils/instance';
import { getRequestConfig } from '../utils/getRequestConfig';
import { formatDateAny } from '../utils/transformDate';

const EditItem: FC<StackScreenProps<AccountParamList, 'EditItem'>> = ({route, navigation}) => {

    const {urlPoint, idItem, type} = route.params;
    
    const itemData = useFetch<GroupType & CompetitionType>(`${urlPoint}/${idItem}`)

     const {user, jwt} = useUserContext().context;

    const {loading, cities, error} = useFetchCity();

    const {
        formState: {errors, isValid},
        handleSubmit,
        control
    } = useForm({
        mode: "onBlur",
    });


    let initialData : TStatement & {category?: string | null} | undefined = itemData.data && type === StatementType.COMETITION ? 
    {
        idStatement: idItem,
        user: itemData.data.organizer,
        name: itemData.data.nameCompetition,
        city: itemData.data.cityCompetition,
        dateStart: itemData.data.dateStart,
        dateFinish: itemData.data.dateFinish,
        type: StatementType.COMETITION,
        statusStatement: null,
        description: itemData.data.descriptionCompetition,
        address: null
    } : itemData.data && type === StatementType.GROUP ?
    {
        idStatement: idItem,
        user: itemData.data.director,
        name: itemData.data.nameGroup,
        city: itemData.data.cityGroup,
        dateStart: null,
        dateFinish: null,
        type: StatementType.GROUP,
        statusStatement: null,
        description: itemData.data.descriptionGroup,
        address: itemData.data.addressGroup,
        category: itemData.data.category,
    } : undefined

    const onSubmitEdit = handleSubmit(async(data) => {
        let city = cities.find(c => c.value === data.city);
        let item = {...itemData.data, idCity: city?.id};

        if(item && type === StatementType.COMETITION) {
            item.nameCompetition = data.name ? data.name : item.nameCompetition;
            item.dateStart = data.dateStart ? formatDateAny(data.dateStart, '/', '-') : item.dateStart;
            item.dateFinish = data.dateFinish ? formatDateAny(data.dateFinish, '/', '-') : item.dateFinish;
            item.descriptionCompetition = data.description ? data.description : item.descriptionCompetition;
        } else if(item && type === StatementType.GROUP) {
            item.nameGroup = data.name ? data.name : item.nameGroup;
            item.descriptionGroup = data.description ? data.description : item.descriptionGroup;
            item.addressGroup = data.address ? data.address : item.addressGroup;
            item.category = data.category ? data.category : item.category;
        }

        confirm('Вы действительно хотите внести изменения?', () => {
            instance.put(urlPoint, JSON.stringify(item), getRequestConfig(jwt))
                .then((result) =>{
                    type === StatementType.COMETITION ? navigation.navigate('MyCompetitions', {urlPoint: 'mycompetitions', idItem: user?.idUser}) : navigation.navigate('MyGroups');
                }).catch((e)=>{
                    if(e.response.data){
                        Alert.alert('Ошибка', e.response.data.message)
                    }else{
                        Alert.alert('Ошибка', "Мы не смогли изменить данные(")
                    }
                })
        })
    })
    
    if(loading || itemData.loading) return <Spinner />
    else if (error || itemData.error) return <ErrorMessage message={error ? error : itemData.error ? itemData.error : 'Мы не смогли загрузить данные('} />
    else return(
        <ScrollView>
            <View style={[mainContainerStyle, editStyle.container]}>
                <ButtonSave activity={onSubmitEdit} />
                <StatementFormInner errors = {errors} control={control} initialData={initialData} cities = {cities} type={route.params.type} />
            </View>
        </ScrollView>
    )
}

const editStyle = StyleSheet.create({
    container: {
        marginTop: 50,
        marginBottom: 100,
        marginHorizontal: 20,
        padding: 20,
        alignItems: 'flex-end'
    }
})

export default EditItem;