import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../config/axiosInstance';

export const getMainAds = createAsyncThunk(
   'main/getMainAds',
   async (_, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance('publishes/getAll');
         return data;
      } catch (error) {
         return rejectWithValue(error.message);
      }
   },
);
