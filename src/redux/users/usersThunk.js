import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../config/axiosInstance';

export const getAllUsers = createAsyncThunk('users/getAllUsers', async () => {
   try {
      const { data } = await axiosInstance.get('users/getAll');
      return data;
   } catch (error) {
      return error.message;
   }
});
