import { createSlice } from '@reduxjs/toolkit';
import { deleteFavorites, getFavorite } from './favoriteThunk';

export const favoriteSlice = createSlice({
   name: 'favorites',
   initialState: {
      favoriteProducts: [],
   },
   extraReducers: builder => {
      builder.addCase(getFavorite.fulfilled, (state, { payload }) => {
         //  console.log(action.payload);
         state.favoriteProducts = payload;
      });
      //  .addCase(deleteFavorites.fulfilled, (state, action) => {
      //     state.favoriteProducts = state.favoriteProducts.filter(
      //        item => item.id !== action.payload,
      //     );
      //  });
   },
});
