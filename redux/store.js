import { configureStore } from '@reduxjs/toolkit';
import favoritesSlice from './favoritesSlice';
import { launchesApi } from './launchesApi';
import { newsApi } from './newsApi';

export const store = configureStore({
    reducer: {
        favorites: favoritesSlice.reducer,
        [launchesApi.reducerPath]: launchesApi.reducer,
        [newsApi.reducerPath]: newsApi.reducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(launchesApi.middleware).concat(newsApi.middleware),
});