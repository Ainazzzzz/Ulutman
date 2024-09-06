import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../config/axiosInstance.js';

export const dashBoard = createAsyncThunk(
   'dashboard',
   async (__, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get(
            'dashboard/categories/popularity/views',
         );

         return data;
      } catch (e) {
         return rejectWithValue;
      }
   },
);
