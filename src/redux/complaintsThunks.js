import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../config/axiosInstance';

export const complaintsThunks = createAsyncThunk(
   'complaints',
   async (__, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get('manage/complaints/getAll');
         return data;
      } catch (error) {
         return rejectWithValue(error.response?.data || error.message);
      }
   },
);

export const getComplaintsFilter = createAsyncThunk(
   'user/getComplaintsFilter',
   async (
      { userIds, complaintTypes, createDates, complaintStatuses },
      { rejectWithValue },
   ) => {
      try {
         const params = new URLSearchParams();

         if (userIds && Array.isArray(userIds)) {
            userIds.forEach(id => params.append('userIds', id));
         }

         if (complaintTypes && Array.isArray(complaintTypes)) {
            complaintTypes.forEach(type =>
               params.append('complaintTypes', type),
            );
         }

         if (createDates && Array.isArray(createDates)) {
            createDates.forEach(date => params.append('createDates', date));
         }

         if (complaintStatuses && Array.isArray(complaintStatuses)) {
            complaintStatuses.forEach(status =>
               params.append('complaintStatuses', status),
            );
         }

         const { data } = await axiosInstance.get(
            `/manage/complaints/filter?${params.toString()}`,
         );
         return data;
      } catch (error) {
         return rejectWithValue(error.response?.data || error.message);
      }
   },
);

export const getResetFilter = createAsyncThunk(
   'users/getResetFilter',
   async () => {
      try {
         const { data } = await axiosInstance.get(
            '/manage/complaints/resetFilter',
         );
         console.log(data);

         return data;
      } catch (error) {
         return error.message;
      }
   },
);
