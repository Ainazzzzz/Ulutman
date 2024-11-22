import { createSlice } from '@reduxjs/toolkit';
import { updateUserProfile } from './profileThunk';

export const profileSlice = createSlice({
   name: 'profile',
   initialState: {},
   extraReducers: builder => {
      builder.addCase(updateUserProfile.fulfilled, (state, action) => {});
   },
});
