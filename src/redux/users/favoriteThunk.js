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
   async (_, { rejectWithValue, dispatch }) => {
      try {
         const { data } = await axiosInstance.post('/deleteAllFavorites');
         dispatch(getAllFavorites());
         return data;
      } catch (error) {
         rejectWithValue(error.response.data);
      }
   },
);

export const deleteFavoritesById = createAsyncThunk(
   'favorite/deleteFavoritesById',
   async (id, { rejectWithValue, dispatch }) => {
      try {
         const { data } = axiosInstance.delete(`/deleteFromFavorites/${id}`);
         dispatch(getAllFavorites());
         return data;
      } catch (error) {
         return rejectWithValue(
            error.response ? error.response.data : 'Ошибка при удалении',
         );
      }
   },
);
