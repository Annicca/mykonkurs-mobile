import { FC, useState, useEffect } from 'react';
import { useUserContext } from '../context/UserContext';
import usePaginationFetch from '../hooks/usePaginationFetch';
import { StackScreenProps } from '@react-navigation/stack';
import { AccountParamList } from '../components/navigation/navBarAccount';
import { CompetitionType } from '../types/CompetitionType';
import { UserRole } from '../consts/const';
import { Text, ListRenderItem } from 'react-native';
import MyCompetitionItem from '../components/myCompetitionItem/MyCompetitionItem';
import PaginationList from '../components/paginationList/PaginationList';
import { confirm } from '../utils/confirm';
import { deleteFetch } from '../utils/delete';
import { accentTextStyle } from '../styles/accentText/AccentText';


const MyCompetitions: FC<StackScreenProps<AccountParamList>> = ({route}) => {

    const {user, jwt: token} = useUserContext().context;

    const [url, setUrl] = useState<string>(`${route.params?.urlPoint}/${user?.idUser}`)

    const competitionsData = usePaginationFetch<CompetitionType>(url, token)

    useEffect(() => {
        setUrl(`${route.params?.urlPoint}/${user?.idUser}`)
    }, [user, route.params])

    const deleteCompetition = (id: number) => {
        confirm(() => deleteFetch(`competitions/${id}`, token, (data) => competitionsData.setData(data)))
    }

    const renderGroup: ListRenderItem<CompetitionType> = ({item}) => {
        return (
            <MyCompetitionItem competition={item} deleteItem={user?.role === UserRole.ORGANIZER ? () => deleteCompetition(item.idCompetition) : () => {}}/>
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