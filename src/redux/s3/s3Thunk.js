import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../config/axiosInstance';

export const sendImageS3 = createAsyncThunk(
   's3/sendImageS3',
   async (image, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.post('S3/upload', image);
         console.log(data);
      } catch (error) {
         return rejectWithValue(error.message);
      }
   },
);
