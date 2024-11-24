import { createSlice } from '@reduxjs/toolkit';
import {
   deleteFavorite,
   getDetailInfo,
   getSimilarAds,
   postFavorite,
} from './detailInfoThunk';
import { sortPublishesRequest } from '../main/mainThunk';

export const detailInfoSlice = createSlice({
   name: 'detailInfo',
   initialState: {
      detailInfo: {},
      loading: false,
      favoriteAdded: false,
      favoriteRemoved: false,
      error: null,
      similarAds: [],
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
         })
         .addCase(deleteFavorite.fulfilled, (state, action) => {
            state.loading = false;
            state.favoriteRemoved = true;
            state.detailInfo.detailFavorite = false;
            state.error = null;
         })
         .addCase(getSimilarAds.fulfilled, (state, action) => {
            state.similarAds = action.payload;
         })
         .addCase(sortPublishesRequest.fulfilled, (state, action) => {
            state.similarAds = action.payload;
         });
   },
});
