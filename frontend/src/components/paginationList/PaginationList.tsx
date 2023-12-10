import { useEffect, ReactElement } from 'react';
import { useRoute } from '@react-navigation/native';
import { FetchTypePagination } from '../../hooks/usePaginationFetch';
import {View, Text, FlatList,  ListRenderItem, StyleSheet} from 'react-native';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import { accentTextStyle } from '../../styles/accentText/AccentText';

type PaginationListProps<T> = {
    stateList: FetchTypePagination<T>,
    renderItem: ListRenderItem<T>,
    headerComponent?: ReactElement, 
    emtytext: string,
    containerStyle?: object,
}

export default function PaginationList<T>({stateList, renderItem, headerComponent, emtytext, containerStyle} : PaginationListProps<T>) {

    const route = useRoute();

    const {data, loading, error, isEnd, page, setPage} = stateList;

    useEffect(() =>{
        setPage((page) => 0)
    }, [route.params])

    const loadData = async() => {
        if(!loading && !isEnd) {
            setPage((page) => page+1)
        }
    }

    return(
        <View>
            {headerComponent}
            {
                error ? <View style={listStyle.container}><ErrorMessage message='Произошла ошибка при загрузке данных' /></View> :
                (!loading && data && data.length === 0) ?
                <View style={listStyle.container}><Text style = {accentTextStyle}>{emtytext}</Text></View> :
                <FlatList 
                data={data}
                extraData={stateList}
                removeClippedSubviews = {true}
                initialNumToRender = {10}
                renderItem={renderItem}
                ListFooterComponent={loading && <Spinner />}
                contentContainerStyle = {containerStyle ? containerStyle : listStyle.list}
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
        paddingTop: 40,
        paddingBottom: 100,
        rowGap: 30,
    },
    container: {
        paddingTop: 40,
        paddingHorizontal: 20,
    }
})