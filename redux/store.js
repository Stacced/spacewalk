import { configureStore } from '@reduxjs/toolkit';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import favoritesSlice from './favoritesSlice';
import { launchesApi } from './launchesApi';
import { newsApi } from './newsApi';
const storage = useAsyncStorage('favorites');

export const store = configureStore({
    reducer: {
        favorites: favoritesSlice.reducer,
        [launchesApi.reducerPath]: launchesApi.reducer,
        [newsApi.reducerPath]: newsApi.reducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(launchesApi.middleware).concat(newsApi.middleware),
});

storage.getItem().then(favorites => {
    favorites = JSON.parse(favorites);
    store.dispatch(favoritesSlice.actions.initializeFavorites(favorites));
});