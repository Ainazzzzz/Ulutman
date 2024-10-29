import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../config/axiosInstance';

export const getMainAds = createAsyncThunk(
   'main/getMainAds',
   async (_, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get('publishes/getAll');
         return data;
      } catch (error) {
         return rejectWithValue(error.message);
      }
   },
);

export const updateFavoriteStatus = createAsyncThunk(
   'main/updateFavoriteStatus',
   async (id, { rejectWithValue, dispatch }) => {
      try {
         await axiosInstance.post(`addToFavorites/${id}`);
         dispatch(getMainAds());
      } catch (error) {
         return rejectWithValue(error.message);
      }
   },
);

export const deleteFavoriteStatus = createAsyncThunk(
   'main/deleteFavoriteStatus',
   async (id, { rejectWithValue, dispatch }) => {
      try {
         await axiosInstance.delete(`deleteFromFavorites/${id}`);
         dispatch(getMainAds());
      } catch (error) {
         return rejectWithValue(error.message);
      }
   },
);

export const sortPublishesRequest = createAsyncThunk(
   'main/sortPublishesRequest',
   async (category = '', { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get(
            `main-page/filter?sortBy=${category}`,
         );
         return data;
      } catch (error) {
         return rejectWithValue(error.message);
      }
   },
);

export const searchCategoryAndMetroRequest = createAsyncThunk(
   'main/searchCategoryAndMetroRequest',
   async (mainData, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get(
            `main-page/search${mainData}`,
         );
         console.log(data);

         return data;
      } catch (error) {
         return rejectWithValue(error.message);
      }
   },
);
