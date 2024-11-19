import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../config/axiosInstance';

export const getAdminCategories = createAsyncThunk(
   'categories/getAll',
   async (_, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get(
            '/manage/category/with-publishes',
         );

         return data;
      } catch (error) {
         return rejectWithValue(error);
      }
   },
);

export const filterAdminCategories = createAsyncThunk(
   'categories/filter',
   async (params, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get('/manage/category/filter', {
            params,
         });

         //  const {} = data;

         return data;
      } catch (error) {
         return rejectWithValue(error);
      }
   },
);
