import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../config/axiosInstance';

export const getDetailInfo = createAsyncThunk(
   'detailInfo/getDetailInfo',
   async (_, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get(`publishes/find/${4}`);
         console.log(data);

         return data;
      } catch (error) {
         rejectWithValue(error.response.data);
      }
   },
);

export const postFavorite = createAsyncThunk(
   'favorite/postFavorite',
   async (_, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get(`addToFavorites/${4}`);
         console.log(data);

         return data;
      } catch (error) {
         rejectWithValue(error.response.data);
      }
   },
);
