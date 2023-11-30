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


const MyStatements: FC<StackScreenProps<AccountParamList, 'MyStatements'>> = ({navigation}) => {

    const {user, jwt: token} = useUserContext().context;

    const [url, setUrl] = useState<string>(`mystatements/${user?.idUser}`)

    const statementData = usePaginationFetch<StatementType>(url, token)

    useEffect(() => {
        setUrl(`mystatements/${user?.idUser}`)
    }, [user])

    const renderStatement: ListRenderItem<StatementType> = ({item}) => {
        return (
            <StatementItem statement={item} />
        );
    };

    if(!user) return <Text style={accentTextStyle}>Пожалуйста авторизируйтесь</Text>
    else 
        return(
            <PaginationList 
                stateList={statementData}
                renderItem={renderStatement}
                emtytext='У вас ещё нет заявок'
            />
        )
}

export default MyStatements;