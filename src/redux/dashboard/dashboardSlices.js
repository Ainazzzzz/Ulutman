import { createSlice } from '@reduxjs/toolkit'
import { dashBoard } from './dashboardThunks'

export const dashboardSlices = createSlice({
   name: 'dashboard',
   initialState: {
      infoDashboard: [],
      isLoading: false,
   },
   reducers: {},

   extraReducers: builder => {
      builder
         .addCase(dashBoard.fulfilled, (state, { payload }) => {
            state.infoDashboard = payload
            state.isLoading = false
         })
         .addCase(dashBoard.pending, state => {
            state.isLoading = true
         })
         .addCase(dashBoard.rejected, state => {
            state.isLoading = false
         })
   },
})
