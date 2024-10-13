import { createSlice } from '@reduxjs/toolkit';
import {
   deleteAllFavorites,
   deleteFavoritesById,
   getAllFavorites,
   getFavoritesStatus,
} from './favoriteThunk';

export const favoriteSlice = createSlice({
   name: 'favoriteProducts',
   initialState: {
      favoriteProducts: {},
      isFavorite: false,
   },
   extraReducers: builder => {
      builder
         .addCase(getAllFavorites.fulfilled, (state, action) => {
            state.favoriteProducts = action.payload;
         })

         .addCase(deleteAllFavorites.fulfilled, (state, action) => {
            state.favoriteProducts = action.payload;
         })
         .addCase(getFavoritesStatus.fulfilled, (state, action) => {
            state.isFavorite = action.payload;
         })
         .addCase(deleteFavoritesById.fulfilled, (state, action) => {
            const productId = action.payload;
            if (state.favoriteProducts[productId]) {
               delete state.favoriteProducts[productId];
            } else {
               console.error('Product not found with id:', productId);
            }
         });
   },
});
