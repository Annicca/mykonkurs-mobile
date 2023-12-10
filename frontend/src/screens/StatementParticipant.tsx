import { FC } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { useUserContext } from '../context/UserContext';
import { StackScreenProps } from '@react-navigation/stack';
import { AccountParamList } from '../components/navigation/navBarAccount';
import PaginationList from '../components/paginationList/PaginationList';
import {ListRenderItem} from 'react-native';
import usePaginationFetch from '../hooks/usePaginationFetch';
import { StatementParticipantType } from '../types/StatementParticipanttype';
import StatementParticipantItem from '../components/statementParticipantItem/StatementParticipantItem';
import ErrorMessage from '../components/errorMessage/ErrorMessage';

const StatementParticipant: FC<StackScreenProps<AccountParamList, 'StatementParticipant'>> = ({route, navigation}) => {

    const {user, jwt} = useUserContext().context;

    const isFocused = useIsFocused();

    const statementParticipantData = usePaginationFetch<StatementParticipantType>(`${route.params.urlPoint}`, jwt, isFocused)

    const renderStatementParticipant: ListRenderItem<StatementParticipantType> = ({item}) => {
        return (
            <StatementParticipantItem statementInit = {item} role = {user?.role} />
        );
    };

    if(!user) return <ErrorMessage message='Пожалуйста авторизируйтесь' />
    else 
        return(
            <PaginationList 
                stateList={statementParticipantData}
                renderItem={renderStatementParticipant}
                emtytext='У вас ещё нет заявок'
            />
        )
}

export default StatementParticipant;