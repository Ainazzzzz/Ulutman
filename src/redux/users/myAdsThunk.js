import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../config/axiosInstance';

export const getMyAds = createAsyncThunk(
   'myAds',
   async (__, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get('publishes/my', {
            params: { userId: 1 },
         });

         return data;
      } catch (error) {
         return rejectWithValue(error.response?.data || error.message);
      }
   },
);
