import { FC } from 'react';
import type { StackScreenProps } from '@react-navigation/stack';
import { CompetitionsParamList } from '../components/navigation/navBarCompetitions';
import { CompetitionType } from '../types/CompetitionType';
import { ListRenderItem } from 'react-native';
import Button from '../components/button/button';
import CompetitionItem from '../components/competitionItem/CompetitionItem';
import PaginationList from '../components/paginationList/PaginationList';
import StatementButton from '../components/statementButton/StatementButton';

const Competitions: FC<StackScreenProps<CompetitionsParamList, 'CompetitionScreen'>> = ({navigation}) => {
    
    const renderCompetition: ListRenderItem<CompetitionType> = ({item}) => {
        return (
            <Button activity={() => navigation.navigate('Competition', {idCompetition: item.idCompetition})}>
                <CompetitionItem competition={item} />
            </Button>

        );
    };

    const url = 'competitions'

    return(
        <PaginationList 
            dataFetchUrl = {url}
            headerComponent={<StatementButton text = '+ Разместить конкурс' />}
            renderItem={renderCompetition}
            emtytext='Конкурсы не найдены'
        />
    )
}

export default Competitions;