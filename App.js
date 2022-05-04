import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Ionicons from '@expo/vector-icons/Ionicons';
import Home from './components/Home';
import Calendar from './components/Calendar';
import Details from './components/Details';
import { createStackNavigator } from '@react-navigation/stack';

const Tab = createBottomTabNavigator();
const HomeNavigator = createStackNavigator();

const HomeStack = () => {
  return (
    <HomeNavigator.Navigator>
      <HomeNavigator.Screen name="Home" component={Home} />
      <HomeNavigator.Screen name="Details" component={Details} options={{ headerBackTitle: 'Back' }} />
    </HomeNavigator.Navigator>
  )
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'HomeStack') {
              iconName = focused ? 'ios-home' : 'ios-home-outline';
            } else if (route.name === 'Calendar') {
              iconName = focused ? 'ios-calendar' : 'ios-calendar-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray',
          headerShown: false
        })}>
          <Tab.Screen name="HomeStack" component={HomeStack} />
          <Tab.Screen name="Calendar" component={Calendar} />
        </Tab.Navigator>
        <StatusBar/>
      </NavigationContainer>
    </Provider>
  )
}
