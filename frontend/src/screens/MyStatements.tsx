import { FC, useEffect, useState } from 'react';
import { useUserContext } from '../context/UserContext';
import usePaginationFetch from '../hooks/usePaginationFetch';
import { StatementType } from '../types/StatementType';
import { StackScreenProps } from '@react-navigation/stack';
import { Text} from 'react-native';
import { ListRenderItem } from 'react-native';
import PaginationList from '../components/paginationList/PaginationList';
import { AccountParamList } from '../components/navigation/navBarAccount';
import { accentTextStyle } from '../styles/accentText/AccentText';
import StatementItem from '../components/statmentItem/StatementItem';
import { UserRole } from '../consts/const';

const MyStatements: FC<StackScreenProps<AccountParamList, 'MyStatements'>> = ({navigation, route}) => {

    const {user, jwt: token} = useUserContext().context;

    const [url, setUrl] = useState<string>(user?.role === UserRole.ADMIN ? 'statements' : `mystatements/${user?.idUser}`)

    const statementData = usePaginationFetch<StatementType>(url, token)

    useEffect(() => {
        if(user?.role === UserRole.ADMIN) {
            route.params.value !== undefined && setUrl(`${route.params.url}/${route.params.value}`)
            route.params.value?.length === 0 && setUrl('statements')
        } else setUrl(`mystatements/${user?.idUser}`)
    }, [user, route.params])

    const renderStatement: ListRenderItem<StatementType> = ({item}) => {
        return (
            <StatementItem 
            statementInit={item} />
        );
    };

    if(!user) return <Text style={accentTextStyle}>Пожалуйста авторизируйтесь</Text>
    else 
        return(
            <PaginationList 
                stateList={statementData}
                renderItem={renderStatement}
                emtytext={ user?.role === UserRole.ADMIN ? 'Заявки не найдены' : 'У вас ещё нет заявок'}
            />
        )
}

export default MyStatements;