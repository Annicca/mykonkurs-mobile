import { FC, useState, useEffect } from 'react';
import usePaginationFetch from '../hooks/usePaginationFetch';
import type { StackScreenProps } from '@react-navigation/stack';
import { CompetitionsParamList } from '../components/navigation/navBarCompetitions';
import { CompetitionType } from '../types/CompetitionType';
import { ListRenderItem } from 'react-native';
import Button from '../uikit/button/button';
import CompetitionItem from '../components/competitionItem/CompetitionItem';
import PaginationList from '../components/paginationList/PaginationList';
import { generateFilterUrl } from '../utils/generateFilterUrl';
import { useIsFocused } from '@react-navigation/native';
import Filter from '../components/filter/Filter';
import { FilterType } from '../types/FilterType';

const Competitions: FC<StackScreenProps<CompetitionsParamList, 'CompetitionScreen'>> = ({navigation, route}) => {
    
    const [url, setUrl] = useState(route.params.url)

    const [filter, setFilter] = useState<FilterType>({})

    const isFocused = useIsFocused();

    const competitionData = usePaginationFetch<CompetitionType>(url,null , isFocused)

    useEffect(() =>{
        setUrl(generateFilterUrl(route.params.url, route.params.value, filter, undefined))
    }, [route.params, filter])
    
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
            renderItem={renderCompetition}
            emtytext='Конкурсы не найдены'
            headerComponent={<Filter filter={filter} setFilter={setFilter} />}
        />
    )
}

export default Competitions;