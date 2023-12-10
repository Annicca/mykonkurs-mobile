import { FC, useState,useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import usePaginationFetch from '../hooks/usePaginationFetch';
import { useUserContext } from '../context/UserContext';
import {Text, ListRenderItem} from 'react-native';
import { StatementType } from '../consts/const';
import { StackScreenProps } from '@react-navigation/stack';
import { AccountParamList } from '../components/navigation/navBarAccount';
import { GroupType } from '../types/GroupType';
import PaginationList from '../components/paginationList/PaginationList';
import { accentTextStyle } from '../styles/accentText/AccentText';
import MyGroupItem from '../components/myGroupItem/MyGroupItem';
import { confirm } from '../utils/confirm';
import { deleteFetch } from '../utils/delete';

const MyGroups: FC<StackScreenProps<AccountParamList, 'MyGroups'>> = ({navigation}) => {

    const {user, jwt: token} = useUserContext().context;

    const [url, setUrl] = useState<string>(`mygroups/${user?.idUser}`)

    const isFocused = useIsFocused()

    const groupData = usePaginationFetch<GroupType>(url, token, isFocused)

    useEffect(() => {
        setUrl(`mygroups/${user?.idUser}`)
    }, [user])

    const deleteGroup = (id: number) => {
        confirm('Вы действительно хотите удалить коллектив?', () => deleteFetch(`groups/${id}`, token, (data) => groupData.setData(data)))
    }

    const toChange = (id: number) => {
        navigation.navigate('EditItem', {urlPoint:'groups', idItem: id, type: StatementType.GROUP})
    }

    const renderGroup: ListRenderItem<GroupType> = ({item}) => {
        return (
            <MyGroupItem group={item} deleteItem={() => deleteGroup(item.idGroup)} toChangeItem={() => toChange(item.idGroup)}/>
        );
    };

    if(!user) return <Text style={accentTextStyle}>Пожалуйста авторизируйтесь</Text>
    else 
        return(
            <PaginationList 
                stateList={groupData}
                renderItem={renderGroup}
                emtytext='У вас ещё нет коллективов'
            />
        )
}

export default MyGroups;