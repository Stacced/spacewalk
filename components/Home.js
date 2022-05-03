import * as React from 'react';
import { Text, View, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { useGetUpcomingLaunchesQuery } from '../redux/launchesApi';
import Countdown from './Countdown';
import LaunchPreview from './LaunchPreview';
import Loader from './Loader';

const Wrapper = styled.SafeAreaView`
    flex: 1;
    align-items: center;
`;

const Home = () => {
    const launches = useGetUpcomingLaunchesQuery();

    return (
        <Wrapper>
            <View>
                <Text>Spacewalk - your rocket launches & space news companion</Text>
                {
                    launches.isLoading ? <Loader /> :
                    <>
                    <LaunchPreview data={launches.data.results[0]} />
                    <Countdown launchTime={launches.data.results[0].net} status={launches.data.results[0].status} />
                    </>
                }
            </View>
        </Wrapper>
    )
}

export default Home;