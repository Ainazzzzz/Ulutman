import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../config/axiosInstance';

// export const getModerationCommentsFilter = createAsyncThunk(
//    'moderation/getCommentsFilter',
//    async (params, { rejectWithValue }) => {
//       try {
//          const { data } = await axiosInstance.get(
//             `/manage/moderator/users/comments-messages`,
//          );

//          return data;
//       } catch (error) {
//          return rejectWithValue(error);
//       }
//    },
// );

export const getModerationComments = createAsyncThunk(
   'moderation/getComments',
   async (params, { rejectWithValue }) => {
      const queryString = new URLSearchParams();

      if (params.createDate && Array.isArray(params.createDate)) {
         params.createDate.forEach(date => {
            queryString.append('createDate', date);
         });
      }
      if (params.moderatorStatuses)
         queryString.append('moderatorStatuses', params.moderatorStatuses);

      if (params.content) queryString.append('content', params.content);

      if (params.names) queryString.append('names', params.names);

      try {
         const { data } = await axiosInstance.get(
            `/manage/moderator/filter?${queryString.toString()}`,
         );

         return data;
      } catch (error) {
         return rejectWithValue(error);
      }
   },
);

export const getCommentsWithName = createAsyncThunk(
   'moderation/getCommentWithName',
   async (name, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get(
            '/manage/moderator/name/filter',
            {
               params: {
                  name,
               },
            },
         );

         return data;
      } catch (error) {
         return rejectWithValue(error);
      }
   },
);

export const getCommentsWithContent = createAsyncThunk(
   'moderation/getCommentsWithContent',
   async (content, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get(
            '/manage/moderator/content/filter',
            {
               params: {
                  content,
               },
            },
         );

         return data;
      } catch (error) {
         return rejectWithValue(error);
      }
   },
);
