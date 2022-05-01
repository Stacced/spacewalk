import * as React from 'react';
import { Text, View, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { useGetUpcomingLaunchesQuery } from '../redux/launchesApi';
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
                    launches.isLoading ? <Loader /> : launches.data.results.map(launch => (
                        <Text key={launch.id}>{launch.name}</Text>
                    ))
                }
            </View>
        </Wrapper>
    )
}

export default Home;