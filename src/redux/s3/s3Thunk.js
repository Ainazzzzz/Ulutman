import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../config/axiosInstance';

export const sendImageS3 = createAsyncThunk(
   's3/sendImageS3',
   async (images, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.post('S3/upload', images, {
            headers: {
               'Content-Type': 'muitipart/form-data',
            },
         });

         return data;
      } catch (error) {
         return rejectWithValue(error.message);
      }
   },
);
