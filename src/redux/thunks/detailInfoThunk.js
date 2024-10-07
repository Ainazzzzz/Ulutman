import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../config/axiosInstance';

export const getDetailInfo = createAsyncThunk(
   'detailInfo/getDetailInfo',
   async (_, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get(`publishes/find/${1}`);
         console.log(data);

         return data;
      } catch (error) {
         rejectWithValue(error.response.data);
      }
   },
);
