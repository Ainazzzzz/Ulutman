import { createSlice } from '@reduxjs/toolkit';

import {
   categoriesFavorite,
   categoriesGetFavorite,
   categoriesThunks,
} from './caregoriesThunks';

export const categoriesSilces = createSlice({
   name: 'categories',
   initialState: {
      categories: [],
      favorites: [],
   },
   reducers: {},

   extraReducers: builder => {
      builder.addCase(categoriesThunks.fulfilled, (state, action) => {
         state.categories = action.payload;
      });
      builder.addCase(categoriesFavorite.fulfilled, (state, action) => {
         const favoriteItem = action.payload;
         if (!state.favorites.find(item => item.id === favoriteItem.id)) {
            state.favorites.push(favoriteItem);
         }
      });
      builder.addCase(categoriesGetFavorite.fulfilled, (state, action) => {
         const favoriteItem = action.payload;
         if (!state.favorites.find(item => item.id === favoriteItem.id)) {
            state.favorites.push(favoriteItem);
         }
      });
   },
});
