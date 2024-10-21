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
   async ({ roles, createDates, statuses, names }) => {
      try {
         const queryString = new URLSearchParams();

         if (roles) queryString.append('roles', roles);

         if (createDates && Array.isArray(createDates)) {
            createDates.forEach(date => {
               queryString.append('createDates', date);
            });
         }

         if (statuses) queryString.append('statuses', statuses);
         if (names) queryString.append('names', names);

         const { data } = await axiosInstance.get(
            `/manage/users/filter?${queryString.toString()}`,
         );

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

         return data;
      } catch (error) {
         return error.message;
      }
   },
);
