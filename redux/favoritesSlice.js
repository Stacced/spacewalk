import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: [],
    reducers: {
        addFavorite(state, action) {
            state.push({
                id: action.payload.id,
                launched: action.payload.launched,
            });
        },
        removeFavorite(state, action) {
            state.splice(state.findIndex(favorite => favorite.id === action.payload.id), 1);
        },
    }
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice;