import { createSlice } from '@reduxjs/toolkit';
import { dashBoard } from './dashboardThunks';

export const dashboardSlices = createSlice({
   name: 'dashboard',
   initialState: {
      infodashboard: {},
   },
   reducers: {},

   extraReducers: builder => {
      builder.addCase(dashBoard.fulfilled, (state, action) => {
         state.infodashboard = action.payload;
      });
   },
});
