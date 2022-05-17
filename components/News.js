import { useNavigation } from '@react-navigation/native';
import { Pressable, ScrollView, Text } from 'react-native';
import styled from 'styled-components';
import { useGetNewsQuery } from '../redux/newsApi';

const NewsCard = styled.View`
    margin: 16px;
    padding: 16px;
    background: #fff;
    border-radius: 10px;
`;

const News = () => {
    const news = useGetNewsQuery();
    const data = news.data?.length >= 1 && news.data;
    const navigation = useNavigation();

    return (
        <ScrollView>
            {
                news.isLoading ? <Text>Loading...</Text> :
                data.map(item => (
                    <Pressable key={item.id} onPress={() => navigation.navigate('Article', { item })}>
                        <NewsCard>
                            <Text>{item.title}</Text>
                            <Text>{item.content}</Text>
                        </NewsCard>
                    </Pressable>
                ))
            }
        </ScrollView>
    )
}

export default News;