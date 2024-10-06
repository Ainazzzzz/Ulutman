import { createSlice } from '@reduxjs/toolkit';

import { categoriesThunks } from './caregoriesThunks';

export const categoriesSilces = createSlice({
   name: 'categories',
   initialState: {
      categories: [],
      // favorites: [],
   },
   reducers: {},

   extraReducers: builder => {
      builder.addCase(categoriesThunks.fulfilled, (state, action) => {
         state.categories = action.payload;
      });
      // builder.addCase(categoriesFavorite.fulfilled, (state, action) => {
      //    const favoriteItem = action.payload;
      //    if (!state.favorites.find(item => item.id === favoriteItem.id)) {
      //       state.favorites.push(favoriteItem);
      //    }
      // });
      // builder.addCase(categoriesFavoriteDelete.fulfilled, (state, action) => {
      //    const favoriteItem = action.payload;
      //    state.favorites = state.favorites.filter(
      //       item => item.id !== favoriteItem.id,
      //    );
      // });
   },
});
