import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
   deleteFavoriteStatus,
   getMainAds,
   searchCategoryAndMetroRequest,
   sortPublishesRequest,
   updateFavoriteStatus,
} from './mainThunk';

export const mainSlice = createSlice({
   name: 'main',
   initialState: {
      publishes: [],
      searchPublishes: [],
      isLoading: false,
   },
   extraReducers: builder => {
      builder
         .addMatcher(
            isAnyOf(
               getMainAds.pending,
               updateFavoriteStatus.pending,
               deleteFavoriteStatus.pending,
               sortPublishesRequest.pending,
               searchCategoryAndMetroRequest.pending,
            ),
            state => {
               state.isLoading = true;
            },
         )
         .addMatcher(
            isAnyOf(
               getMainAds.fulfilled,
               updateFavoriteStatus.fulfilled,
               deleteFavoriteStatus.fulfilled,
               sortPublishesRequest.fulfilled,
            ),
            (state, { payload }) => {
               if (payload) state.publishes = payload;
               state.isLoading = false;
            },
         )
         .addMatcher(
            isAnyOf(
               getMainAds.rejected,
               updateFavoriteStatus.rejected,
               deleteFavoriteStatus.rejected,
               sortPublishesRequest.rejected,
               searchCategoryAndMetroRequest.rejected,
            ),
            state => {
               state.isLoading = false;
            },
         )
         .addMatcher(
            isAnyOf(searchCategoryAndMetroRequest.fulfilled),
            (state, { payload }) => {
               state.searchPublishes = payload;
               state.isLoading = false;
            },
         );
   },
});

export default mainSlice.reducer;
