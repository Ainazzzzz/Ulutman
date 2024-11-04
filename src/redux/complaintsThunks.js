import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../config/axiosInstance';
import axios from 'axios';

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
   'complaints/getComplaintsFilter',
   async (
      { userIds, complaintsTypes, createDates, complaintStatuses, names },
      { rejectWithValue },
   ) => {
      try {
         const params = new URLSearchParams();

         if (userIds && Array.isArray(userIds)) {
            userIds.forEach(id => params.append('userIds', id));
         }

         if (complaintsTypes && Array.isArray(complaintsTypes)) {
            complaintsTypes.forEach(type =>
               params.append('complaintsTypes', type),
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

         if (names) params.append('names', name);

         const { data } = await axiosInstance.get(
            `manage/complaints/filter?${params.toString()}`,
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

         return data;
      } catch (error) {
         return error.message;
      }
   },
);

export const deleteComplaints = createAsyncThunk(
   'complaints/delete',
   async ({ ids, toggleModal }, { rejectWithValue, dispatch }) => {
      try {
         await axiosInstance.delete('/api/manage/complaints/delete/batch', {
            data: ids,
         });

         toggleModal('deleteAllModal');

         dispatch(complaintsThunks());
      } catch (error) {
         return rejectWithValue(error);
      }
   },
);
