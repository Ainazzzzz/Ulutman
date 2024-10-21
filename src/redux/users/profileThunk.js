import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../config/axiosInstance';

export const updateUserProfile = createAsyncThunk(
   'profile/updateUserProfile',
   async ({ profileData, userId }, { rejectWithValue }) => {
      try {
         const { data } = axiosInstance.put(
            `user-accounts/${userId}`,
            profileData,
         );

         return data;
      } catch (error) {
         return rejectWithValue(error.message);
      }
   },
);
