import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, FlatList, Pressable, Switch, Text, View } from 'react-native';
import { useGetUpcomingLaunchesQuery } from '../redux/launchesApi';
import CalendarCard from './CalendarCard';
import Loader from './Loader';

const Calendar = ({ navigation }) => {
    const [page, setPage] = useState(1);
    const [onlyFavorites, setOnlyFavorites] = useState(false);
    const launches = useGetUpcomingLaunchesQuery(page);
    const favorites = useSelector(state => state.favorites);
    const displayedLaunches = launches.data?.results.filter(launch => !onlyFavorites || favorites.find(favorite => favorite.id === launch.id));

    return (
        <View>
            {
                launches.isLoading ? (
                    <View style={{ marginTop: 20 }}>
                        <Loader />
                    </View>
                ) : (
                    <>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                        <Text>Show favorite launches only</Text>
                        <Switch disabled={launches.isLoading} value={onlyFavorites} onValueChange={setOnlyFavorites} />
                    </View>
                    <FlatList
                        data={displayedLaunches}
                        renderItem={({ item }) => (
                            <Pressable key={item.id} onPress={() => navigation.navigate('Details', { data: item })}>
                                <CalendarCard data={item} isFavorite={favorites.find(favorite => favorite.id === item.id)}/>
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
                    </>
                )
            }
        </View>
    )
}

export default Calendar;