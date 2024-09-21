import { createSlice } from '@reduxjs/toolkit';
import { deleteFavorites, getFavorites } from './favoriteThunk';

export const favoriteSlice = createSlice({
   name: 'favoriteProducts',
   initialState: {
      favoriteProducts: [],
   },
   extraReducers: builder => {
      builder
         .addCase(getFavorites.fulfilled, (state, action) => {
            state.favoriteProducts = action.payload;
         })
         .addCase(deleteFavorites.fulfilled, (state, action) => {
            state.favoriteProducts = action.payload;
         });
   },
});
