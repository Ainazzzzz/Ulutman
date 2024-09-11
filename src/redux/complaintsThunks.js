import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../config/axiosInstance';

export const complaintsThunks = createAsyncThunk(
   'complaints',
   async (__, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get('manage/complaints/getAll');
         return data;
      } catch (error) {
         return rejectWithValue(error.response?.data || error.message);
      }
   },
);
