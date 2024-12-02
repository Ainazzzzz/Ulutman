import { createSlice } from '@reduxjs/toolkit';
import { addAdvertisingThunks } from './adversstitingpayThunks';

export const advertisingSlice = createSlice({
   name: 'advertising',
   initialState: {
      loading: false,
      success: false,
      error: null,
      advertisement: null,
      advertisementList: [],
   },
   reducers: {
      resetState: state => {
         state.loading = false;
         state.success = false;
         state.error = null;
      },
   },
   extraReducers: builder => {
      builder
         .addCase(addAdvertisingThunks.pending, state => {
            state.loading = true;
            state.error = null;
            state.success = false;
         })
         .addCase(addAdvertisingThunks.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.advertisement = action.payload;
         })
         .addCase(addAdvertisingThunks.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || 'Ошибка при создании рекламы.';
         });
   },
});
