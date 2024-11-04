import { createSlice } from '@reduxjs/toolkit';
import {
   deleteAllAds,
   getMyAds,
   getRejectedPublishes,
   putDeactivatePublishes,
} from './myAdsThunk';

export const myAdsSlice = createSlice({
   name: 'myAds',
   initialState: {
      myAds: [],
   },
   reducers: {},

   extraReducers: builder => {
      builder
         .addCase(getMyAds.fulfilled, (state, action) => {
            state.myAds = action.payload;
         })
         .addCase(deleteAllAds.fulfilled, state => {
            state.myAds = [];
         })
         .addCase(getRejectedPublishes.fulfilled, (state, action) => {
            state.myAds = action.payload;
         })
         .addCase(putDeactivatePublishes.fulfilled, (state, action) => {
            state.myAds = action.payload;
         });
   },
});
