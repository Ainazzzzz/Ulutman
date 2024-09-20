import { createSlice } from '@reduxjs/toolkit';
import { complaintsThunks, getComplaintsFilter } from './complaintsThunks';

export const complaintsSlice = createSlice({
   name: 'complaints',
   initialState: {
      data: [],
   },
   reducers: {},

   extraReducers: builder => {
      builder.addCase(complaintsThunks.fulfilled, (state, action) => {
         state.data = action.payload;
      });
      builder.addCase(getComplaintsFilter.fulfilled, (state, { payload }) => {
         state.data = payload;
      });
   },
});
