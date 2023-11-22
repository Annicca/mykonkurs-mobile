import { useEffect } from 'react';
import {View, Text, FlatList,  ListRenderItem, StyleSheet, Dimensions} from 'react-native';
import usePaginationFetch from '../../hooks/usePaginationFetch';
import { ReactElement } from 'react';
import Spinner from '../spinner/Spinner';
import { useRoute } from '@react-navigation/native';


type PaginationListProps<T> = {
    dataFetchUrl: string,
    renderItem: ListRenderItem<T>,
    headerComponent: ReactElement, 
    emtytext: string,
    containerStyle?: object,
}

export default function PaginationList<T>({dataFetchUrl, renderItem, headerComponent, emtytext, containerStyle} : PaginationListProps<T>) {
    
    const { data, loading, error, page, setPage } = usePaginationFetch<T>(dataFetchUrl)

    const route = useRoute();

    useEffect(() =>{
        setPage((page) => 0)
    }, [route.params])

    const loadData = async() => {
        if(!loading) {
            setPage((page) => page+1)
        }
    }
    
    return(
        <View>
            <View style={listStyle.container}>{headerComponent}</View>
            {
                error ? <Text>Произошла ошибка</Text> :
                !loading && data.length === 0 ?
                <Text style = {listStyle.text}>{emtytext}</Text> :
                <FlatList 
                data={data}
                removeClippedSubviews = {true}
                initialNumToRender = {10}
                renderItem={renderItem }
                ListFooterComponent={loading && <Spinner />}
                contentContainerStyle = {containerStyle ? containerStyle : listStyle.list}
                // ListEmptyComponent={() => }
                onEndReachedThreshold={0.5}
                onEndReached={loadData}
                />
            }
        </View>
    )
}

const listStyle = StyleSheet.create({
    list: {
        paddingHorizontal: 20,
        paddingVertical: 40,
        rowGap: 30,
    },
    text: {
        paddingTop: 40,
        paddingHorizontal: 20,
        color: '#FF6B00',
        fontSize: 16,
        fontFamily: 'Inter-Bold'
    },
    container: {
        paddingTop: 40,
        paddingHorizontal: 20,
    }
})