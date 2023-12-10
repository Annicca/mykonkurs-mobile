import { FC, useState, useEffect } from 'react';
import { useUserContext } from '../context/UserContext';
import usePaginationFetch from '../hooks/usePaginationFetch';
import { StackScreenProps } from '@react-navigation/stack';
import { AccountParamList } from '../components/navigation/navBarAccount';
import { CompetitionType } from '../types/CompetitionType';
import { StatementType, UserRole } from '../consts/const';
import { Text, ListRenderItem } from 'react-native';
import MyCompetitionItem from '../components/myCompetitionItem/MyCompetitionItem';
import PaginationList from '../components/paginationList/PaginationList';
import { confirm } from '../utils/confirm';
import { deleteFetch } from '../utils/delete';
import { accentTextStyle } from '../styles/accentText/AccentText';
import { useIsFocused } from '@react-navigation/native';

const MyCompetitions: FC<StackScreenProps<AccountParamList, 'MyCompetitions'>> = ({route, navigation}) => {

    const {user, jwt: token} = useUserContext().context;

    const [url, setUrl] = useState<string>(`${route.params?.urlPoint}/${route.params?.idItem}`)

    const isFocused = useIsFocused()

    const competitionsData = usePaginationFetch<CompetitionType>(url, token, isFocused)

    useEffect(() => {
        setUrl(`${route.params?.urlPoint}/${route.params?.idItem}`)
    },[route.params])

    const deleteCompetition = (id: number) => {
        confirm('Вы действительно хотите удалить конкурс?',() => deleteFetch(`competitions/${id}`, token, (data) => competitionsData.setData(data)))
    }

    const toChange = (id: number) => {
        navigation.navigate('EditItem', {urlPoint:'competitions', idItem: id, type: StatementType.COMETITION})
    }

    const renderGroup: ListRenderItem<CompetitionType> = ({item}) => {
        return (
            <MyCompetitionItem 
                competition={item} 
                deleteItem={user?.role === UserRole.ORGANIZER ? () => deleteCompetition(item.idCompetition) : undefined}
                toChangeItem={user?.role === UserRole.ORGANIZER ? () => toChange(item.idCompetition) : undefined}/>
        );
    };

    if(!user) return <Text style={accentTextStyle}>Пожалуйста авторизируйтесь</Text>
    else 
        return(
            <PaginationList 
                stateList={competitionsData}
                renderItem={renderGroup}
                emtytext='У вас ещё нет конкурсов'
            />
        )
}

export default MyCompetitions;