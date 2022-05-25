import { useState } from 'react';
import { View, Text, Animated, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../redux/favoritesSlice';
import Ionicons from '@expo/vector-icons/Ionicons';
import styled from 'styled-components/native';
import Countdown from './Countdown';

const IMAGE_HEIGHT = 400;

const Image = styled(Animated.Image)`
    height: ${IMAGE_HEIGHT + 50}px;
    width: 100%;
    position: absolute;
    background: #888;
`;

const Content = styled.View`
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    margin-top: 30px;
    background: #e6e6e6;
`;

const Title = styled.Text`
    font-weight: bold;
    font-size: 28px;
    padding: 24px 16px;
    text-align: center;
`;

const Subtitle = styled.Text`
    margin-top: 30px;
    margin-left: 20px;
    font-size: 25px;
    font-weight: bold;
`;

const Description = styled.View`
    padding: 20px;
    margin: 16px 0;
    background-color: #fff;
`;

const DescriptionText = styled.Text`
    margin-bottom: 16px;
    font-size: 17px;
`;

const Row = styled.View`
    flex-direction: row;
    align-items: center;
    margin-bottom: 10px;
`;

const Label = styled.Text`
    margin-left: 10px;
`;

const LaunchDetails = ({ route }) => {
    const { data } = route.params;
    const [ scrollY ] = useState(new Animated.Value(0));
    const dispatch = useDispatch();
    const favorites = useSelector(state => state.favorites);
    const isFavorite = favorites.find(favorite => favorite.id === data.id);
    const missionType = data.mission?.type ?? 'Unknown';
    const missionDescription = data.mission?.description ?? 'No description available';

    const ImageScale = scrollY.interpolate({
        inputRange: [-100, 0, 200],
        outputRange: [1.4, 1.2, 1],
        extrapolate: 'clamp'
    })

    return (
        <View style={{ overflow: 'hidden' }}>
            <Image source={{ uri: data.image || data.rocket.configuration.image_url }} style={{ transform: [{ scale: ImageScale }] }} />
            <Animated.ScrollView
                contentContainerStyle={{ paddingTop: IMAGE_HEIGHT }}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    {
                        useNativeDriver: true,
                    }
                )}
            >
                <Content>
                    <Title>{data.name}</Title>
                    <Countdown launchTime={data.net} status={data.status} />
                    <Subtitle>Mission</Subtitle>
                    <Description>
                        <View>
                            <Text style={{ fontWeight: 'bold' }}>{missionType}</Text>
                            <View style={{ marginTop: 10 }}>
                                <DescriptionText>{missionDescription}</DescriptionText>
                            </View>
                        </View>
                        {
                            data.launch_service_provider.name && (
                                <Row>
                                    <Ionicons name="ios-briefcase" size={20} color="blue"/>
                                    <Label>{data.launch_service_provider.name}</Label>
                                </Row>
                            )
                        }
                        {
                            data.net && (
                                <Row>
                                    <Ionicons name="ios-time-outline" size={20} color="blue"/>
                                    <Label>{ new Date(data.net).toLocaleString() }</Label>
                                </Row>
                            )
                        }
                        {
                            data.pad.name && (
                                <Row>
                                    <Ionicons name="ios-pin" size={20} color="blue"/>
                                    <Label>{ data.pad.location.name }</Label>
                                </Row>
                            )
                        }
                    </Description>
                    <Button
                        title={isFavorite ? "Remove from favorites" : "Add to favorites"}
                        onPress={() => isFavorite ? dispatch(removeFavorite({ id: data.id })) : dispatch(addFavorite({ id: data.id, launchTime: data.net }))}
                    />
                </Content>
            </Animated.ScrollView>
        </View>
    )
}

export default LaunchDetails;