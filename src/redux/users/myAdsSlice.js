import { createSlice } from '@reduxjs/toolkit'
import {
   deleteSelectedAds,
   getMyAds,
   myAdvertising,
   RaisingPublication,
} from './myAdsThunk'

export const myAdsSlice = createSlice({
   name: 'myAds',
   initialState: {
      activeAds: [],
      myAdvertising: [],
      myAds: [],
      favoriteCounts: 0,
      raisingPublication: [],
      errorMessage: 'Произошла ошибка при удалении',
   },
   reducers: {},

   extraReducers: builder => {
      builder
         .addCase(getMyAds.fulfilled, (state, action) => {
            state.activeAds = action.payload.filter(ad => ad.active)
            state.rejectedAds = action.payload.filter(ad => ad.rejected)
            state.myAds = action.payload.filter(ad => ad.myAds)
         })
         .addCase(myAdvertising.fulfilled, (state, action) => {
            state.myAdvertising = action.payload
         })

         .addCase(RaisingPublication.fulfilled, (state, action) => {
            state.raisingPublication = action.payload
         })

         .addCase(deleteSelectedAds.fulfilled, (state, action) => {
            const idsToDelete = action.payload

            state.activeAds = state.activeAds.filter(
               ad => !idsToDelete.includes(ad.id),
            )

            state.rejectedAds = state.rejectedAds.filter(
               ad => !idsToDelete.includes(ad.id),
            )
            state.errorMessage = ''
         })
         .addCase(deleteSelectedAds.rejected, (state, action) => {
            state.errorMessage =
               action.payload || 'Произошла ошибка при удалении'
         })
   },
})
