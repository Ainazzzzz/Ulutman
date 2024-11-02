import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../config/axiosInstance.js';
import Cookies from 'js-cookie';
import { showToast } from '../../hooks/useToast.js';

export const logOut = createAsyncThunk(
   'auth/logOut',
   async ({ navigate, toggleModal }) => {
      navigate('/');

      toggleModal();

      return Cookies.remove('ULUTMAN');
   },
);

export const signIn = createAsyncThunk(
   'auth/signIn',
   async ({ userData, onClose }, { rejectedWithValue }) => {
      try {
         const { data } = await axiosInstance.post('auth/sign-in', userData);

         const updatedData = { ...data, role: data.roleName };

         Cookies.set('ULUTMAN', JSON.stringify(updatedData));

         showToast('success', 'Успешно');
         onClose();

         return updatedData;
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

         Cookies.set('ULUTMAN', JSON.stringify(data));

         showToast('success', 'Успешно');
         onClose();

         return data;
      } catch (e) {
         return rejectedWithValue(e);
      }
   },
);
