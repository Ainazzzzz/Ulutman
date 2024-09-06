import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../config/axiosInstance';

export const getAdminAdds = createAsyncThunk(
   'adds/adminAdds',
   async (_, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get('manage/publishes/getAll');
         console.log(data);
      } catch (error) {
         rejectWithValue(error.response.data);
      }
   },
);
