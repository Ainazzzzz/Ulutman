import { createSlice } from '@reduxjs/toolkit';
import { getAllUsers, getUsersName, getUsersFilter } from './usersThunk';

export const usersSlice = createSlice({
   name: 'users',
   initialState: {
      allUsers: [],
   },
   extraReducers: builder => {
      builder.addCase(getAllUsers.fulfilled, (state, { payload }) => {
         state.allUsers = payload;
      });

      builder.addCase(getUsersName.fulfilled, (state, { payload }) => {
         state.allUsers = payload;
      });
      builder.addCase(getUsersFilter.fulfilled, (state, { payload }) => {
         state.allUsers = payload;
      });
   },
});
