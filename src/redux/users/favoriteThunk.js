import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../config/axiosInstance';

export const getFavorites = createAsyncThunk(
   'favorite/getFavorites',
   async (_, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get('/getAllFavorites');
         return data;
      } catch (error) {
         rejectWithValue(error.response.data);
      }
   },
);
export const deleteFavorites = createAsyncThunk(
   'favorites/deleteFavorites',
   async (_, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.post('/deleteAllFavorites');
         console.log(data);
         return data;
      } catch (error) {
         rejectWithValue(error.response.data);
      }
   },
);
export const getFavoritesStatus = createAsyncThunk(
   'favorite/getFavoritesStatus',
   async (productId, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get('/favorites/check', {
            params: { productId },
         });

         return data;
      } catch (error) {
         rejectWithValue(error.response.data);
      }
   },
);
