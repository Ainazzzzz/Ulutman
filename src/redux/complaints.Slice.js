import { createSlice } from '@reduxjs/toolkit';
import { complaintsThunks } from './complaintsThunks';

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
   },
});
