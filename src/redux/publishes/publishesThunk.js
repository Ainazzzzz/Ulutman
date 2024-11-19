import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../config/axiosInstance';

export const fetchPublishesUser = createAsyncThunk(
   'publishes/fetchPublishesUser',
   async ({ publishe, paymentReceiptFile }, { rejectWithValue }) => {
      try {
         const filteredPublishe = Object.fromEntries(
            Object.entries(publishe).filter(
               ([_, value]) =>
                  value !== undefined && value !== null && value !== '',
            ),
         );

         const { data } = await axiosInstance.post(
            'publishes/create',
            { paymentReceiptFile },
            {
               headers: {
                  'Content-Type': 'multipart/form-data',
               },
               params: filteredPublishe,
            },
         );

         return data;
      } catch (error) {
         return rejectWithValue(error.message);
      }
   },
);
