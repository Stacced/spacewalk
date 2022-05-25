import { View, Text } from 'react-native';
import styled from 'styled-components/native';

const Thumbnail = styled.Image`
    height: 100px;
    width: 100px;
    border-radius: 10px;
    overflow: hidden;
    margin-right: 10px;
`;

const ContentWrapper = styled.View`
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

const NewsCard = ({ data }) => {
    const datePublished = new Date(data.publishedAt).getTime() / 1000;
    const timeDiff = new Date().getTime() / 1000 - datePublished;
    const daysDiff = Math.floor(timeDiff / 60 / 60 / 24);
    const timePosted =
    daysDiff > 0
        ? `${daysDiff} day${daysDiff > 1 ? "s" : ""} ago`
        : "Today";

    return (
        <ContentWrapper>
            <Thumbnail source={{ uri: data.imageUrl }} />
            <View style={{ justifyContent: 'space-between', width: '70%' }}>
                <Text>{data.title}</Text>
                <Subtitle>
                    {data.newsSite} <Dot/> {timePosted}
                </Subtitle>
            </View>
        </ContentWrapper>
    )
}

export default NewsCard;