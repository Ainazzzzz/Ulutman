import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../config/axiosInstance';

export const getDetailInfo = createAsyncThunk(
   'detailInfo/getDetailInfo',
   async (_, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get(`publishes/find/${22}`);
         console.log(data);

         return data;
      } catch (error) {
         rejectWithValue(error.response.data);
      }
   },
);

export const postFavorite = createAsyncThunk(
   'favorite/postFavorite',
   async (id, { rejectWithValue, dispatch }) => {
      try {
         const { data } = await axiosInstance.post(`addToFavorites/${id}`);
         dispatch(getDetailInfo());
         return data;
      } catch (error) {
         rejectWithValue(error.response.data);
      }
   },
);

export const deleteFavorite = createAsyncThunk(
   'favorite/deleteFavorite',
   async (id, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.delete(
            `deleteFromFavorites/${id}`,
         );
         return data;
      } catch (error) {
         rejectWithValue(error.response.data);
      }
   },
);
