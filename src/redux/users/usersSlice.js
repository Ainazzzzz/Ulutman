import { createSlice } from '@reduxjs/toolkit';
import { getAllUsers } from './usersThunk';

export const usersSlice = createSlice({
   name: 'users',
   initialState: {
      allUsers: [],
   },
   extraReducers: builder => {
      builder.addCase(getAllUsers.fulfilled, (state, { payload }) => {
         state.allUsers = payload;
      });
   },
});
