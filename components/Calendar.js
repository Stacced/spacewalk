import { useState } from 'react';
import { Button, FlatList, Pressable, View } from 'react-native';
import { useGetUpcomingLaunchesQuery } from '../redux/launchesApi';
import CalendarCard from './CalendarCard';
import Loader from './Loader';

const Calendar = ({ navigation }) => {
    const [page, setPage] = useState(1);
    const launches = useGetUpcomingLaunchesQuery(page);

    return (
        <View>
            {
                launches.isLoading ? (
                    <Loader />
                ) : (
                    <FlatList
                        data={launches.data?.results}
                        renderItem={({ item }) => (
                            <Pressable key={item.id} onPress={() => navigation.navigate('Details', { data: item })}>
                                <CalendarCard data={item}/>
                            </Pressable>
                        )}
                        ListFooterComponent={() => (
                            <View style={{ margin: 20 }}>
                                {
                                    launches.isFetching ? <Loader /> :
                                    <Button title="Load more launches" disabled={launches.isFetching || launches.isError} onPress={() => setPage(page + 1)} />
                                }
                            </View>
                        )}
                    />
                )
            }
        </View>
    )
}

export default Calendar;