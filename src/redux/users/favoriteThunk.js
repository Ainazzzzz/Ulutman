import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../config/axiosInstance';

export const getFavorites = createAsyncThunk(
   'favorite/getFavorites',
   async (_, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get('/getAllFavorites');
         console.log(data);
         return data;
      } catch (error) {
         rejectWithValue(error.response.data);
      }
   },
);
export const deleteFavorites = createAsyncThunk(
   'delete,deleteFavorites',
   async (id, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.delete(
            `/deleteFromFavorites/${id}`,
         );
         console.log(data);
         return data;
      } catch (error) {
         rejectWithValue(error);
      }
   },
);
