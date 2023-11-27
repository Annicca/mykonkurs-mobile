import { FC } from 'react';
import { GroupType } from '../types/GroupType';
import type { StackScreenProps } from '@react-navigation/stack';
import { GroupsParamList } from '../../components/navigation/navBarGroups';
import { ListRenderItem } from 'react-native';
import GroupItem from '../../components/groupItem/GroupItem';
import Button from '../../components/button/button';
import StatementButton from '../../components/statementButton/StatementButton';
import PaginationList from '../../components/paginationList/PaginationList';

const Groups: FC<StackScreenProps<GroupsParamList,'GroupsScreens'>> = ({navigation}) => {

    const url = 'groups';
    
    const renderGroup: ListRenderItem<GroupType> = ({item}) => {
        return (
            <Button activity={() => navigation.navigate('Group', {idGroup: item.idGroup})}>
                <GroupItem group={item} />
            </Button>

        );
    };

    return(
        <PaginationList 
            dataFetchUrl = {url}
            headerComponent={<StatementButton text = '+ Разместить коллектив' />}
            renderItem={renderGroup}
            emtytext='Коллективы не найдены'
        />
    )
}

export default Groups;