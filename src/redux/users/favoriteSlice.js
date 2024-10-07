import { createSlice } from '@reduxjs/toolkit';
import {
   deleteFavorites,
   getFavorites,
   getFavoritesStatus,
} from './favoriteThunk';

export const favoriteSlice = createSlice({
   name: 'favoriteProducts',
   initialState: {
      favoriteProducts: [],
      isFavorite: false,
   },
   extraReducers: builder => {
      builder
         .addCase(getFavorites.fulfilled, (state, action) => {
            state.favoriteProducts = action.payload;
         })
         .addCase(deleteFavorites.fulfilled, (state, action) => {
            state.favoriteProducts = action.payload;
         })
         .addCase(getFavoritesStatus.fulfilled, (state, action) => {
            state.isFavorite = action.payload;
         });
   },
});
