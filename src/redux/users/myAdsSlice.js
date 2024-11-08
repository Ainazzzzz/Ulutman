import { createSlice } from '@reduxjs/toolkit';
import {
   deleteAllAds,
   getDeactivatePublishes,
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
         .addCase(getDeactivatePublishes.fulfilled, (state, action) => {
            state.myAds = action.payload;
         })
         .addCase(putDeactivatePublishes.fulfilled, (state, action) => {
            state.loading = false;
            const updatedAd = action.payload; // Предполагается, что API возвращает обновленное объявление
            const index = state.myAds.findIndex(ad => ad.id === updatedAd.id);
            if (index !== -1) {
               state.myAds[index] = updatedAd;
            }
         });
   },
});
