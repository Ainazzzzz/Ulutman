import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../config/axiosInstance.js';

export const logOut = createAsyncThunk('auth/logOut', async () => {
   return localStorage.removeItem('ULUTMAN');
});

export const signIn = createAsyncThunk(
   'auth/signIn',
   async ({ userData, onClose }, { rejectedWithValue }) => {
      try {
         const { data } = await axiosInstance.post('auth/sign-in', userData);

         onClose();

         return data;
      } catch (e) {
         return rejectedWithValue(e);
      }
   },
);

export const signUp = createAsyncThunk(
   'auth/signUp',
   async ({ val, onClose }, { rejectedWithValue }) => {
      try {
         const { data } = await axiosInstance.post('auth/sign-up', val);

         onClose();

         return data;
      } catch (e) {
         return rejectedWithValue(e);
      }
   },
);
