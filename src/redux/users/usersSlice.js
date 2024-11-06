import { createSlice } from '@reduxjs/toolkit';
import {
   getAllUsers,
   getUsersName,
   getUsersFilter,
   blockUserRequest,
} from './usersThunk';

export const usersSlice = createSlice({
   name: 'users',
   initialState: {
      allUsers: [],
      isLoading: false,
   },
   reducers: {
      checkAllUsers: (state, { payload }) => {
         state.allUsers = payload.data.map(item => {
            if (payload.checked) {
               return { ...item, checked: true };
            }
            return { ...item, checked: false };
         });
      },
      checkUser: (state, { payload }) => {
         state.allUsers = state.allUsers.map(item => {
            if (item.id === payload.data.id) {
               return { ...item, checked: payload.checked };
            }
            return item;
         });
      },
   },
   extraReducers: builder => {
      builder
         .addCase(getAllUsers.fulfilled, (state, { payload }) => {
            state.allUsers = payload;
            state.isLoading = false;
         })
         .addCase(getAllUsers.pending, state => {
            state.isLoading = true;
         })
         .addCase(getAllUsers.rejected, state => {
            state.isLoading = false;
         });

      builder
         .addCase(getUsersName.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.allUsers = payload;
         })
         .addCase(getUsersName.pending, state => {
            state.isLoading = true;
         })
         .addCase(getUsersName.rejected, state => {
            state.isLoading = false;
         });

      builder
         .addCase(getUsersFilter.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.allUsers = payload;
         })
         .addCase(getUsersFilter.pending, state => {
            state.isLoading = true;
         })
         .addCase(getUsersFilter.rejected, state => {
            state.isLoading = false;
         });

      builder
         .addCase(blockUserRequest.fulfilled, state => {
            state.isLoading = false;
         })
         .addCase(blockUserRequest.pending, state => {
            state.isLoading = true;
         })
         .addCase(blockUserRequest.rejected, state => {
            state.isLoading = false;
         });
   },
});

export const { checkAllUsers, checkUser } = usersSlice.actions;
