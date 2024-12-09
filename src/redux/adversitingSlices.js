import { createSlice } from '@reduxjs/toolkit'
import { cardGetAdvertising } from './adversitingThunks'

export const adversitingSlices = createSlice({
   name: 'advertising',
   initialState: {
      advertising: [],
      errorAdvertising: null,
      loading: false,
   },
   reducers: {},
   extraReducers: builder => {
      builder
         .addCase(cardGetAdvertising.pending, state => {
            state.loading = true
         })
         .addCase(cardGetAdvertising.fulfilled, (state, action) => {
            state.loading = false
            state.advertising = action.payload
         })
         .addCase(cardGetAdvertising.rejected, (state, action) => {
            state.loading = false
            state.errorAdvertising = action.error.message
         })
   },
})
