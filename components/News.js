import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Pressable, Button, FlatList } from 'react-native';
import { useGetNewsQuery } from '../redux/newsApi';
import Loader from './Loader';
import NewsCard from './NewsCard';

const News = () => {
    const [page, setPage] = useState(1);

    const news = useGetNewsQuery(page);
    const data = news.data?.length >= 1 && news.data;
    const navigation = useNavigation();

    return (
        <View>
            {
                news.isLoading ? (
                    <View style={{ marginTop: 20 }}>
                        <Loader />
                    </View>
                ) : (
                    <FlatList
                        data={data}
                        renderItem={({ item }) => (
                            <Pressable key={item.id} onPress={() => navigation.navigate('Article', { item })}>
                                <NewsCard data={item} />
                            </Pressable>
                        )}
                        ListFooterComponent={() => (
                            <View style={{ margin: 20 }}>
                                {
                                    news.isFetching ? <Loader /> :
                                    <Button title="Load more news" disabled={news.isFetching || news.isError} onPress={() => setPage(page + 1)} />
                                }
                            </View>
                        )}
                    />
                )
            }
        </View>
    )
}

export default News;