import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../config/axiosInstance';

export const getAllFavorites = createAsyncThunk(
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
export const deleteAllFavorites = createAsyncThunk(
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

export const deleteFavoritesById = createAsyncThunk(
   'favorite/deleteFavoritesById',
   async (id, { rejectWithValue }) => {
      try {
         const { data } = axiosInstance.delete(`/deleteFromFavorites/${id}`);
         return data;
      } catch (error) {
         return rejectWithValue(
            error.response ? error.response.data : 'Ошибка при удалении',
         );
      }
   },
);
