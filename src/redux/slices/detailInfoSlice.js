import { createSlice } from '@reduxjs/toolkit';
import { getDetailInfo, postFavorite } from '../thunks/detailInfoThunk';

export const detailInfoSlice = createSlice({
   name: 'detailInfo',
   initialState: {
      detailInfo: {},
      loading: false,
      favoriteAdded: false,
      error: null,
   },
   extraReducers: builder => {
      builder
         .addCase(getDetailInfo.fulfilled, (state, action) => {
            state.detailInfo = action.payload;
         })
         .addCase(postFavorite.pending, state => {
            state.loading = true;
            state.favoriteAdded = false;
            state.error = null;
         })
         .addCase(postFavorite.fulfilled, (state, action) => {
            state.loading = false;
            state.favoriteAdded = true;
            state.error = null;
         })
         .addCase(postFavorite.rejected, (state, action) => {
            state.loading = false;
            state.favoriteAdded = false;
            state.error = action.payload || 'Не удалось добавить в избранное';
         });
   },
});
