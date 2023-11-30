import { FC, useState, useEffect } from 'react';
import usePaginationFetch from '../hooks/usePaginationFetch';
import type { StackScreenProps } from '@react-navigation/stack';
import { CompetitionsParamList } from '../components/navigation/navBarCompetitions';
import { CompetitionType } from '../types/CompetitionType';
import { ListRenderItem } from 'react-native';
import Button from '../uikit/button/button';
import CompetitionItem from '../components/competitionItem/CompetitionItem';
import PaginationList from '../components/paginationList/PaginationList';
import StatementButton from '../components/statementButton/StatementButton';
import { generateFilterUrl } from '../utils/generateFilterUrl';

const Competitions: FC<StackScreenProps<CompetitionsParamList, 'CompetitionScreen'>> = ({navigation, route}) => {
    
    const [url, setUrl] = useState(route.params.url)

    const competitionData = usePaginationFetch<CompetitionType>(url)

    useEffect(() =>{
        setUrl(generateFilterUrl(route.params.url, route.params.city, undefined, undefined))
    }, [route.params])
    
    const renderCompetition: ListRenderItem<CompetitionType> = ({item}) => {
        return (
            <Button activity={() => navigation.navigate('Competition', {idCompetition: item.idCompetition})}>
                <CompetitionItem competition={item} />
            </Button>

        );
    };

    return(
        <PaginationList 
            stateList={competitionData}
            headerComponent={<StatementButton text = '+ Разместить конкурс' />}
            renderItem={renderCompetition}
            emtytext='Конкурсы не найдены'
        />
    )
}

export default Competitions;