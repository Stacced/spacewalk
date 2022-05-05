import { useState } from 'react';
import { View, Text, Animated } from 'react-native';
import styled from 'styled-components/native';
import Countdown from './Countdown';

const IMAGE_HEIGHT = 400;

const Image = styled(Animated.Image)`
    height: ${IMAGE_HEIGHT + 50}px;
    width: 100%;
    position: absolute;
    background: #888;
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

const LaunchDetails = ({ route }) => {
    const { data } = route.params;
    const [ scrollY ] = useState(new Animated.Value(0));
    console.log(data.mission);

    const videoLink = data.vidURLs && data.vidURLs.length > 0 && data.vidURLs[0].url;
    const wikipediaLink = data.launch_service_provider.wiki_url;
    const lspAbbreviation = data.launch_service_provider.abbrev ?? '';
    const missionType = data.mission?.type ?? 'Unknown';
    const missionDescription = data.mission?.description ?? 'No description available';

    const ImageScale = scrollY.interpolate({
        inputRange: [-100, 0, 200],
        outputRange: [1.4, 1.2, 1],
        extrapolate: 'clamp'
    })

    console.log(data.net)

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
                <View>
                    <Title>{data.name}</Title>
                    <Countdown launchTime={data.net} status={data.status} />
                    <Subtitle>Mission</Subtitle>
                    <Description>
                        <View>
                            <Text>{missionType}</Text>
                            <View style={{ marginTop: 10 }}>
                                <DescriptionText>{missionDescription}</DescriptionText>
                            </View>
                            {
                                data.launch_service_provider.name && (
                                    <Row>
                                        <Text>{data.launch_service_provider.name}</Text>
                                    </Row>
                                )
                            }
                            {
                                data.net && (
                                    <Text>{ new Date(data.net).toLocaleString() }</Text>
                                )
                            }
                            {
                                data.pad.name && (
                                    <Row>
                                        <Text>{ data.pad.location.name }</Text>
                                    </Row>
                                )
                            }
                        </View>
                    </Description>
                </View>
            </Animated.ScrollView>
        </View>
    )
}

export default LaunchDetails;