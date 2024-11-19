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

export const MyAds = createAsyncThunk(
   'myAds/getMyAds',
   async (__, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get('users/my-publishes/my-ads');

         return data;
      } catch (error) {
         return rejectWithValue(error.response?.data || error.message);
      }
   },
);

export const RaisingPublication = createAsyncThunk(
   'myAds/raising',
   async (__, { getState, rejectWithValue }) => {
      try {
         const userId = getState().auth.userData.userId;

         const { data } = await axiosInstance.get(
            `users/my-publishes/raising-the- publication`,
            {
               params: { userId },
            },
         );

         return data;
      } catch (error) {
         return rejectWithValue(error.response?.data || error.message);
      }
   },
);

export const deleteSelectedAds = createAsyncThunk(
   'myAds/deleteSelectedAds',
   async ({ userId, selectedIds }, { rejectWithValue, dispatch }) => {
      try {
         const { data } = await axiosInstance.delete(
            `users/my-publishes/delete-by-user/${userId}`,
            {
               data: selectedIds,
            },
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

export const getFavoriteCount = createAsyncThunk(
   'myAds/favoriteCount',
   async ({ publishId }, { getState, rejectWithValue }) => {
      try {
         const userId = getState().auth.userData.userId;

         const { data } = await axiosInstance.get(`users/my-publishes/count`, {
            params: {
               userId: userId,
               publishId: publishId,
            },
         });

         return data;
      } catch (error) {
         return rejectWithValue(error.response?.data || error.message);
      }
   },
);
