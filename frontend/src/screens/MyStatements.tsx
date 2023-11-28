import { FC, useEffect, useState } from 'react';
import { StatementType } from '../types/StatementType';
import { StackScreenProps } from '@react-navigation/stack';
import { Text} from 'react-native';
import { ListRenderItem } from 'react-native';
import PaginationList from '../components/paginationList/PaginationList';
import { AccountParamList } from '../components/navigation/navBarAccount';
import { accentTextStyle } from '../styles/accentText/AccentText';
import StatementItem from '../components/statmentItem/StatementItem';


const MyStatements: FC<StackScreenProps<AccountParamList, 'MyStatements'>> = ({route}) => {

    const [url, setUrl] = useState<string>('')

    useEffect(() => {
        setUrl(`mystatements/${route.params.idUser}`)
    }, [route.params])

    const renderCompetition: ListRenderItem<StatementType> = ({item}) => {
        return (
            <StatementItem statement={item} />
        );
    };

    if(!url) return <Text style={accentTextStyle}>Пожалуйста авторизируйтесь</Text>
    else 
        return(
            <PaginationList 
                dataFetchUrl = {url}
                renderItem={renderCompetition}
                emtytext='У вас ещё нет заявок'
            />
        )
}

export default MyStatements;