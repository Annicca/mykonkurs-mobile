import {View, Text, FlatList,  ListRenderItem, StyleSheet} from 'react-native';
import usePaginationFetch from '../../src/hooks/usePaginationFetch';
import { ReactElement } from 'react';


type PaginationListProps<T> = {
    dataFetchUrl: string,
    renderItem: ListRenderItem<T>,
    headerComponent: ReactElement, 
    emtytext: string,
    containerStyle?: object,
}

export default function PaginationList<T>({dataFetchUrl, renderItem, headerComponent, emtytext, containerStyle} : PaginationListProps<T>) {
    
    const { data, loading, error, page, setPage } = usePaginationFetch<T>(dataFetchUrl)

    const loadData = async() => {
        if(!loading) {
            setPage((page) => page+1)
        }
    }
    
    return(
        <View>
            {!!data && 
            <FlatList 
            data={data}
            ListHeaderComponent={headerComponent}
            removeClippedSubviews = {true}
            initialNumToRender = {10}
            renderItem={renderItem }
            contentContainerStyle = {containerStyle ? containerStyle : listStyle.list}
            ListEmptyComponent={() => <Text style = {listStyle.text}>{emtytext}</Text>}
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
        color: '#FF6B00',
        fontSize: 16,
        fontFamily: 'Inter-Bold'
    },
})