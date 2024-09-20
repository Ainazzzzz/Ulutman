import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../config/axiosInstance';

export const getModerationCommentsFilter = createAsyncThunk(
   'moderation/getCommentsFilter',
   async (params, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get(
            `/manage/moderator/users/comments-messages`,
         );

         return data;
      } catch (error) {
         return rejectWithValue(error);
      }
   },
);

export const getModerationComments = createAsyncThunk(
   'moderation/getComments',
   async (_, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get(
            `/manage/moderator/users/comments-messages`,
         );

         return data;
      } catch (error) {
         return rejectWithValue(error);
      }
   },
);
