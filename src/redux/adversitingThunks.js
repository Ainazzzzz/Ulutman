import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../config/axiosInstance';

export const cardGetAdvertising = createAsyncThunk(
   'advertising/get',
   async (_, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get('/advertising');

         return data;
      } catch (e) {
         console.error('Error:', e.response?.data || e.message);
         return rejectWithValue(e.response?.data || e.message);
      }
   },
);
