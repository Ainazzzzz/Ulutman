import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../config/axiosInstance';
import { showToast } from '../../hooks/useToast';

export const getDetailInfo = createAsyncThunk(
   'detailInfo/getDetailInfo',
   async (_, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get(`publishes/find/${22}`);

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
         showToast('success', 'Успешно добавлено в избранное');
         return data;
      } catch (error) {
         rejectWithValue(error.response.data);
      }
   },
);

export const deleteFavorite = createAsyncThunk(
   'favorite/deleteFavorite',
   async (id, { rejectWithValue, dispatch }) => {
      try {
         const { data } = await axiosInstance.delete(
            `deleteFromFavorites/${id}`,
         );
         dispatch(getDetailInfo());
         showToast('success', 'Удалено');

         return data;
      } catch (error) {
         rejectWithValue(error.response.data);
      }
   },
);

export const getSimilarAds = createAsyncThunk(
   'detailInfo/getSimilarAds',
   async (_, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get('publishes/getAll/');
         console.log(data);

         return data;
      } catch (error) {
         rejectWithValue(error.response.data);
      }
   },
);
