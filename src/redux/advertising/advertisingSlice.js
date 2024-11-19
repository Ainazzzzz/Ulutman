import { createSlice } from '@reduxjs/toolkit';
import { getAdversiting } from './advertisingThunk';

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
         .addCase(getAdversiting.fulfilled, (state, action) => {
            state.advertising = action.payload;
            state.isLoading = false;
            state.error = '';
         })
         .addCase(getAdversiting.pending, state => {
            state.isLoading = true;
            state.error = '';
         })
         .addCase(getAdversiting.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
         });
   },
});
