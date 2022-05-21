import { FlatList, Pressable, View } from 'react-native';
import { useGetUpcomingLaunchesQuery } from '../redux/launchesApi';
import CalendarCard from './CalendarCard';
import Loader from './Loader';

const Calendar = ({ navigation }) => {
    const launches = useGetUpcomingLaunchesQuery();

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
                    />
                )
            }
        </View>
    )
}

export default Calendar;