import { createSlice } from '@reduxjs/toolkit';
import { getMyAds } from './myAdsThunk';

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
   },
});
