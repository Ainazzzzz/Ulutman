import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../config/axiosInstance';

export const getMyAds = createAsyncThunk(
   'myAds',
   async (__, { getState, rejectWithValue }) => {
      try {
         const userId = getState().auth.userData.userId;

         const { data } = await axiosInstance.get(
            `users/my-publishes/${userId}`,
         );

         return data;
      } catch (error) {
         return rejectWithValue(error.response?.data || error.message);
      }
   },
);

export const deleteAdsById = createAsyncThunk(
   'myAds',
   async (__, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.delete(
            `users/my-publishes/delete-by-user/{1}`,
         );

         return data;
      } catch (error) {
         return rejectWithValue(error.response?.data || error.message);
      }
   },
);

export const deleteAllAds = createAsyncThunk(
   'myAds/deleteAll',
   async (userId, { rejectWithValue, dispatch }) => {
      try {
         const { data } = await axiosInstance.delete(
            `users/my-publishes/delete-all/${userId}`,
         );
         dispatch(getMyAds());
         return data;
      } catch (error) {
         return rejectWithValue(error.response?.data || error.message);
      }
   },
);

export const getRejectedPublishes = createAsyncThunk(
   'myAds/getRejectedPublishes',
   async (_, { getState, rejectWithValue }) => {
      try {
         const userId = getState().auth.userData.userId;
         const { data } = await axiosInstance.get(
            `users/my-publishes/rejected-publishes/${userId}`,
         );
         return data;
      } catch (error) {
         return rejectWithValue(error.response?.data || error.message);
      }
   },
);

export const getDeactivatePublishes = createAsyncThunk(
   'myAds/getDeactivatePublishes',
   async (_, { getState, rejectWithValue }) => {
      try {
         const userId = getState().auth.userData.userId;
         const { data } = await axiosInstance.get(
            `users/my-publishes/inactive-publishes/${userId}`,
         );
         return data;
      } catch (error) {
         return rejectWithValue(error.response?.data || error.message);
      }
   },
);

export const putDeactivatePublishes = createAsyncThunk(
   'myAds/putDeactivatePublishes',
   async (publishId, { getState, rejectWithValue }) => {
      try {
         const userId = getState().auth.userData.userId;

         const { data } = await axiosInstance.put(
            `users/my-publishes/deactivate/${userId}/${publishId}`,
         );

         //  const endpoint = `users/my-publishes/${
         //     active ? 'active' : 'deactive'
         //  }/${userId}/${publishId}`; // Выбираем правильный путь в зависимости от isActive

         //  const { data } = await axiosInstance.put(endpoint);

         return data;
      } catch (error) {
         return rejectWithValue(error.response?.data || error.message);
      }
   },
);
