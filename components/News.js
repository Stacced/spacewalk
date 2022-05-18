import { useNavigation } from '@react-navigation/native';
import { View, Pressable, ScrollView, Text } from 'react-native';
import styled from 'styled-components/native';
import { useGetNewsQuery } from '../redux/newsApi';
import Loader from './Loader';

const Thumbnail = styled.ImageBackground`
    height: 100px;
    width: 100px;
    border-radius: 10px;
    overflow: hidden;
    margin-right: 10px;
`;

const NewsCard = styled.View`
    background: #fff;
    border-radius: 10px;
    flex-direction: row;
    margin: 10px;
    padding: 10px;
`;

const Subtitle = styled.Text`
    font-weight: bold;
`;

const Dot = styled.View`
  	width: 10px;
  	height: 10px;
  	border-radius: 5px;
  	background: blue;
`;

const News = () => {
    const news = useGetNewsQuery();
    const data = news.data?.length >= 1 && news.data;
    const navigation = useNavigation();

    return (
        <ScrollView>
            {
                news.isLoading ? <Loader /> :
                data.map(item => {
                    const datePublished = new Date(item.publishedAt).getTime() / 1000;
                    const timeDiff = new Date().getTime() / 1000 - datePublished;
                    const daysDiff = Math.floor(timeDiff / 60 / 60 / 24);
                    const timePosted =
                    daysDiff > 0
                        ? `${daysDiff} day${daysDiff > 1 ? "s" : ""} ago`
                        : "Today";

                    return (
                        <Pressable key={item.id} onPress={() => navigation.navigate('Article', { item })}>
                        <NewsCard>
                            <Thumbnail source={{ uri: item.imageUrl }} />
                            <View style={{ justifyContent: 'space-between', width: '70%' }}>
                                <Text>{item.title}</Text>
                                <Subtitle>
                                    {item.newsSite} <Dot/> {timePosted}
                                </Subtitle>
                            </View>
                        </NewsCard>
                    </Pressable>
                    )
                })
            }
        </ScrollView>
    )
}

export default News;