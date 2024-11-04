import { createSlice } from '@reduxjs/toolkit';
import { deleteAllAds, getMyAds, getRejectedPublishes } from './myAdsThunk';

export const myAdsSlice = createSlice({
   name: 'myAds',
   initialState: {
      myAds: [],
   },
   reducers: {},

   extraReducers: builder => {
      builder.addCase(getMyAds.fulfilled, (state, action) => {
         state.myAds = action.payload;
      });
      builder.addCase(deleteAllAds.fulfilled, state => {
         state.myAds = [];
      });
      builder.addCase(getRejectedPublishes.fulfilled, (state, action) => {
         state.myAds = action.payload;
      });
   },
});
