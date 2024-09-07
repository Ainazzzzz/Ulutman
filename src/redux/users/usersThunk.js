import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../config/axiosInstance';

export const getAllUsers = createAsyncThunk('users/getAllUsers', async () => {
   try {
      const { data } = await axiosInstance.get('/manage/users/getAll');
      return data;
   } catch (error) {
      return error.message;
   }
});

export const getUsersName = createAsyncThunk(
   'users/getUsersName',
   async value => {
      try {
         const { data } = await axiosInstance.get('/manage/users/name/filter', {
            params: {
               name: value,
            },
         });

         return data;
      } catch (error) {
         return error.message;
      }
   },
);
export const getUsersFilter = createAsyncThunk(
   'users/getUsersFilter',
   async ({ roles, createDate, statuses }) => {
      try {
         const { data } = await axiosInstance.get('manage/users/filter', {
            params: {
               roles: roles,
               createDate: createDate,
               statuses,
            },
         });
         console.log(data);

         return data;
      } catch (error) {
         return error.message;
      }
   },
);

export const getResetFilter = createAsyncThunk(
   'users/getResetFilter',
   async () => {
      try {
         const { data } = await axiosInstance.get('/manage/users/resetFilter');
         console.log(data);

         return data;
      } catch (error) {
         return error.message;
      }
   },
);
