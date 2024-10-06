import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../config/axiosInstance.js';

export const categoriesThunks = createAsyncThunk(
   'categories',
   async (realEstate, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get(`/main-page/${realEstate}`);

         return data;
      } catch (e) {
         return rejectWithValue();
      }
   },
);
export const categoriesFavorite = createAsyncThunk(
   'categoriesfavorite',
   async ({ id }, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.post(`/addToFavorites/${id}`);

         return data;
      } catch (e) {
         return rejectWithValue();
      }
   },
);
export const categoriesFavoriteDelete = createAsyncThunk(
   'categoriesfavoritedelete',
   async ({ id }, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.delete(
            `/deleteFromFavorites/${id}`,
         );

         return data;
      } catch (e) {
         return rejectWithValue();
      }
   },
);
