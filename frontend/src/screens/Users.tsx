import { FC, useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import usePaginationFetch from '../hooks/usePaginationFetch';
import { StackScreenProps } from '@react-navigation/stack';
import { AccountParamList } from '../components/navigation/navBarAccount';
import { useUserContext } from '../context/UserContext';
import { ListRenderItem } from 'react-native';
import { UserType } from '../types/UserType';
import ErrorMessage from '../components/errorMessage/ErrorMessage';
import PaginationList from '../components/paginationList/PaginationList';
import UserItem from '../components/userItem/UserItem';

const Users: FC<StackScreenProps<AccountParamList, 'Users'>> = ({route}) => {

    const {user, jwt: token} = useUserContext().context;

    const isFocused = useIsFocused()

    const [url, setUrl] = useState<string>('users')

    const usersData = usePaginationFetch<UserType>(url, token, isFocused)

    useEffect(() => {
        route.params.value !== undefined ? setUrl(`${route.params.url}/${route.params.value}`) : setUrl('users')
    }, [route.params])

    const renderUser: ListRenderItem<UserType> = ({item}) => {
        return (
            <UserItem user = {item} />
        );
    };

    if(!user) return <ErrorMessage message='Пожалуйста авторизуйтесь' />
    else 
        return(
            <PaginationList 
                stateList={usersData}
                renderItem={renderUser}
                emtytext='Пользователи не найдены'
            />
        )
}

export default Users; 