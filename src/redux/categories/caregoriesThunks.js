import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../config/axiosInstance.js';

export const categoriesThunks = createAsyncThunk(
   'categories',
   async (realEstate, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get(`main-page/${realEstate}`);

         return data;
      } catch (e) {
         return rejectWithValue();
      }
   },
);

export const categoriesFavorite = createAsyncThunk(
   'categoriesfavorite/add',
   async ({ id }, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.post(`/addToFavorites/${id}`);

         return data;
      } catch (e) {
         return rejectWithValue();
      }
   },
);

export const categoriesGetFavorite = createAsyncThunk(
   'categoriesGetfavorite',
   async ({ productId }, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get('/favorites/check', {
            params: { productId },
         });

         return data;
      } catch (e) {
         return rejectWithValue();
      }
   },
);
