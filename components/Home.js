import * as React from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components/native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
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
    const data = launches.data?.results?.length >= 1 && launches.data.results[0]
    const navigation = useNavigation();

    return (
        <Wrapper>
            <View>
                {
                    launches.isLoading ? <Loader /> :
                    <>
                    <LaunchPreview data={data} onPress={() => navigation.navigate('Details', { data })} />
                    <Countdown launchTime={data.net} status={data.status} />
                    </>
                }
            </View>
        </Wrapper>
    )
}

export default Home;