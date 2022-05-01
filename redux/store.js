import { configureStore } from '@reduxjs/toolkit';
import favoritesSlice from './favoritesSlice';
import { launchesApi } from './launchesApi';

export const store = configureStore({
    reducer: {
        favorites: favoritesSlice.reducer,
        [launchesApi.reducerPath]: launchesApi.reducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(launchesApi.middleware),
});