import { createSlice } from '@reduxjs/toolkit';
import { filterMailing, getAllMailing } from './mailingThunk';

const initialState = {
   mailing: [],
   isLoading: false,
};

export const mailingSlice = createSlice({
   name: 'mailing',
   initialState,
   reducers: {},
   extraReducers: builder => {
      builder
         .addCase(getAllMailing.fulfilled, (state, action) => {
            state.mailing = action.payload;
            state.isLoading = false;
         })
         .addCase(getAllMailing.rejected, state => {
            state.isLoading = false;
         })
         .addCase(getAllMailing.pending, state => {
            state.isLoading = true;
         });

      builder
         .addCase(filterMailing.fulfilled, (state, action) => {
            state.mailing = action.payload;
            state.isLoading = false;
         })
         .addCase(filterMailing.rejected, state => {
            state.isLoading = false;
         })
         .addCase(filterMailing.pending, state => {
            state.isLoading = true;
         });
   },
});
