import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../config/axiosInstance';

export const postMailing = createAsyncThunk(
   'mailing/post',
   async ({ mailingData, navigate }, { dispatch, rejectWithValue }) => {
      try {
         await axiosInstance.post('/mailing/create', mailingData);

         dispatch(getAllMailing());

         navigate(-1);
      } catch (error) {
         return rejectWithValue(error);
      }
   },
);

export const getAllMailing = createAsyncThunk(
   'mailing/get',
   async (_, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get('/manage/mailing/all');
         return data;
      } catch (error) {
         return rejectWithValue(error);
      }
   },
);

export const filterMailing = createAsyncThunk(
   'filterMailing/get',
   async ({ type, statuses, createDates }, { rejectWithValue }) => {
      try {
         const queryString = new URLSearchParams();

         if (type) queryString.append('mailingTypes', type);

         if (createDates && Array.isArray(createDates)) {
            createDates.forEach(date => {
               queryString.append('createDates', date);
            });
         }

         if (statuses) queryString.append('mailingStatuses', statuses);

         const { data } = await axiosInstance.get(
            `/manage/mailing/filter?${queryString.toString()}`,
         );

         return data;
      } catch (error) {
         return rejectWithValue(error);
      }
   },
);
