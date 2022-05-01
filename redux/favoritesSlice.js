import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: [],
    reducers: {
        favoriteAdded(state, action) {
            state.push({
                id: action.payload.id,
                launched: action.payload.launched,
            });
        },
        favoriteRemoved(state, action) {
            state.splice(state.findIndex(favorite => favorite.id === action.payload.id), 1);
        },
    }
});

export const { favoriteAdded, favoriteRemoved } = favoritesSlice.actions;
export default favoritesSlice;