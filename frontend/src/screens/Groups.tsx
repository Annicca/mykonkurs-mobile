import { FC, useEffect, useState } from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import { instance } from '../utils/instance';
import { GroupType } from '../types/GroupType';
import GroupItem from '../../components/groupItem/GroupItem';
import axios from 'axios';

const Groups: FC = () => {

    const [groups, setGroups] = useState<Array<GroupType>>([]);
    const [page, setPage] = useState<number>(0)

    let text = '';

    useEffect(() => {
        const getGroup = async(page: number) => {
            await axios.get(`http://192.168.56.1:8080/api/groups?page=${page}`)
                .then((resp) => {
                    setGroups([...groups, ...resp.data.content]);
                    console.log(resp.data.status)
                    text = JSON.stringify(groups)
                })
                .catch((error) => {
                    text = error.toString()
                    console.log(error)
                }); 
        }
        getGroup(page);
    }, [page])

    return(
        <View>
            <Text style = {{paddingTop: '50%', color: '#000'}}>aaaa</Text>
            {groups.length !== 0 && 
            <FlatList data={groups}
            renderItem={({item}) => <GroupItem group={item} />}
            contentContainerStyle = {groupStyle.list}
            ListEmptyComponent={() => <Text style = {groupStyle.text}>Коллективы не найдены</Text>}
            onEndReachedThreshold={0.5}
            onEndReached={() => setPage((page) => page+1)}
            />
            }
        </View>
    )

    // if( groups.length === 0) {
    //     return(
    //         <View>
    //             <Text>Loading ...</Text>
    //         </View>
    //     )
    // } else if(groups.length !== 0) {
    //     <View>
    //         <Text>a {groups[0].nameGroup}</Text>
    //     </View>
    // } else {
    //     return(
    //         <View>
    //             <Text>Коллективы не найдены</Text>
    //         </View>
    //     )
    // }
}

const groupStyle = StyleSheet.create({
    list: {
        paddingHorizontal: 20,
        paddingVertical: 50,
        rowGap: 30
    },
    text: {
        color: '#FF6B00',
        fontSize: 16,
        fontFamily: 'Inter-Bold'
    }
})

export default Groups;