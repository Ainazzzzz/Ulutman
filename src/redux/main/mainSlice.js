import { createSlice } from '@reduxjs/toolkit';
import { getMainAds } from './mainThunk';

export const mainSlice = createSlice({
   name: 'main',
   initialState: {
      publishes: [],
   },
   extraReducers: builder => {
      builder.addCase(getMainAds.fulfilled, (state, { payload }) => {
         state.publishes = payload;
      });
   },
});
