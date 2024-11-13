import { createSlice } from '@reduxjs/toolkit';
import {
   deleteSelectedAds,
   getFavoriteCount,
   getMyAds,
   MyAds,
   RaisingPublication,
} from './myAdsThunk';

export const myAdsSlice = createSlice({
   name: 'myAds',
   initialState: {
      activeAds: [],
      rejectedAds: [],
      myAds: [],
      favoriteCounts: {},
      raisingPublication: [],
   },
   reducers: {},

   extraReducers: builder => {
      builder
         .addCase(getMyAds.fulfilled, (state, action) => {
            state.activeAds = action.payload.filter(ad => ad.active);
            state.rejectedAds = action.payload.filter(ad => ad.rejected);
            state.myAds = action.payload.filter(ad => ad.myAds);
         })
         .addCase(MyAds.fulfilled, (state, action) => {
            state.myAds = action.payload;
         })
         .addCase(RaisingPublication.fulfilled, (state, action) => {
            state.raisingPublication = action.payload;
         })

         .addCase(deleteSelectedAds.fulfilled, (state, action) => {
            const idsToDelete = action.payload;
            state.activeAds = state.activeAds.filter(
               ad => !idsToDelete.includes(ad.id),
            );

            state.rejectedAds = state.rejectedAds.filter(
               ad => !idsToDelete.includes(ad.id),
            );
         })
         .addCase(getFavoriteCount.fulfilled, (state, action) => {
            const { publishId, favoriteCount } = action.payload; // Предполагаем, что экшен возвращает { publishId, favoriteCount }
            state.favoriteCounts[publishId] = favoriteCount; // Сохраняем количество фаворитов по publishId
         });
   },
});
