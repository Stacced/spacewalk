import { createSlice } from '@reduxjs/toolkit';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
const storage = useAsyncStorage('favorites');

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: [],
    reducers: {
        addFavorite(state, action) {
            state.push({
                id: action.payload.id,
                launchTime: action.payload.launchTime,
            });
            storage.setItem(JSON.stringify(state));
        },
        removeFavorite(state, action) {
            state.splice(state.findIndex(favorite => favorite.id === action.payload.id), 1);
            storage.setItem(JSON.stringify(state));
        },
        initializeFavorites(state, action) {
            const launches = action.payload?.filter(launch => new Date(launch.launchTime) > new Date());
            state.push(...launches);
        }
    },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice;