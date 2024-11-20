import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../config/axiosInstance';

export const addAdvertisingThunks = createAsyncThunk(
   'advertising/add',
   async ({ bank, imageFile, paymentReceiptFile }, { rejectWithValue }) => {
      try {
         const formData = new FormData();

         formData.append('imageFile', imageFile);
         formData.append('paymentReceiptFile', paymentReceiptFile);

         const response = await axiosInstance.post(
            `/advertising?bank=${bank}`,
            formData,
            {
               headers: {
                  'Content-Type': 'multipart/form-data',
               },
            },
         );

         return response.data;
      } catch (error) {
         console.error('Error adding advertising:', error);
         return rejectWithValue(error.response?.data || error.message);
      }
   },
);
