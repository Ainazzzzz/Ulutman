import { createSlice } from '@reduxjs/toolkit';
import { getAdvertising } from './advertisingThunk';

const initialState = {
   advertising: [],
   isLoading: false,
   error: '',
};

export const advertisingSlice = createSlice({
   name: 'advertising',
   initialState,
   reducers: {},
   extraReducers: builder => {
      builder
         .addCase(getAdvertising.fulfilled, (state, action) => {
            state.advertising = action.payload;
            state.isLoading = false;
            state.error = '';
         })
         .addCase(getAdvertising.pending, state => {
            state.isLoading = true;
            state.error = '';
         })
         .addCase(getAdvertising.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
         });
   },
});
