import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../config/axiosInstance';

export const getModerationComments = createAsyncThunk(
   'moderation/getComments',
   async (params, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get(
            `/manage/moderator/comments/filter`,
         );

         return data;
      } catch (error) {
         return rejectWithValue(error);
      }
   },
);
