import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../config/axiosInstance';
import Cookies from 'js-cookie';

export const updateUserProfile = createAsyncThunk(
   'profile/updateUserProfile',
   async ({ profileData, userId }, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.put(
            `user-accounts/${userId}`,
            profileData,
         );

         const parsedData = JSON.parse(Cookies.get('ULUTMAN') || '{}');
         Cookies.set('ULUTMAN', JSON.stringify({ ...parsedData, ...data }));

         return data;
      } catch (error) {
         return rejectWithValue(error.message);
      }
   },
);
