import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../config/axiosInstance';

export const fetchPublishesUser = createAsyncThunk(
   'publishes/fetchPublishesUser',
   async (userPublishesData, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.post(
            'publishes/create',
            userPublishesData,
         );
         return data;
      } catch (error) {
         return rejectWithValue(error.message);
      }
   },
);
