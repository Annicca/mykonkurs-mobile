import { FC, useEffect, useState } from 'react';
import usePaginationFetch from '../hooks/usePaginationFetch';
import { GroupType } from '../types/GroupType';
import type { StackScreenProps } from '@react-navigation/stack';
import { GroupsParamList } from '../components/navigation/navBarGroups';
import { ListRenderItem } from 'react-native';
import GroupItem from '../components/groupItem/GroupItem';
import Button from '../uikit/button/button';
import StatementButton from '../components/statementButton/StatementButton';
import PaginationList from '../components/paginationList/PaginationList';
import { generateFilterUrl } from '../utils/generateFilterUrl';

const Groups: FC<StackScreenProps<GroupsParamList,'GroupsScreens'>> = ({navigation, route}) => {

    const [url, setUrl] = useState(route.params.url)

    const groupData = usePaginationFetch<GroupType>(url)

    useEffect(() =>{
        setUrl(generateFilterUrl(route.params.url, route.params.city, undefined, undefined))
    }, [route.params])
    
    const renderGroup: ListRenderItem<GroupType> = ({item}) => {
        return (
            <Button key = {item.idGroup} activity={() => navigation.navigate('Group', {idGroup: item.idGroup})}>
                <GroupItem group={item} />
            </Button>

        );
    };

    return(
        <PaginationList 
            stateList={groupData}
            headerComponent={<StatementButton text = '+ Разместить коллектив' />}
            renderItem={renderGroup}
            emtytext='Коллективы не найдены'
        />
    )
}

export default Groups;