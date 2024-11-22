import { createSlice } from '@reduxjs/toolkit';
import { filterMailing, getAllMailing } from './mailingThunk';

const initialState = {
   mailing: [],
   isLoading: false,
};

export const mailingSlice = createSlice({
   name: 'mailing',
   initialState,
   reducers: {
      checkAllMailing: (state, { payload }) => {
         state.mailing = payload.data.map(item => {
            if (payload.checked) {
               return { ...item, checked: true };
            }
            return { ...item, checked: false };
         });
      },
      checkMailing: (state, { payload }) => {
         state.mailing = state.mailing.map(item => {
            if (item.id === payload.data.id) {
               return { ...item, checked: payload.checked };
            }
            return item;
         });
      },
   },
   extraReducers: builder => {
      builder
         .addCase(getAllMailing.fulfilled, (state, action) => {
            state.mailing = action.payload;
            state.isLoading = false;
         })
         .addCase(getAllMailing.rejected, state => {
            state.isLoading = false;
         })
         .addCase(getAllMailing.pending, state => {
            state.isLoading = true;
         });

      builder
         .addCase(filterMailing.fulfilled, (state, action) => {
            state.mailing = action.payload;
            state.isLoading = false;
         })
         .addCase(filterMailing.rejected, state => {
            state.isLoading = false;
         })
         .addCase(filterMailing.pending, state => {
            state.isLoading = true;
         });
   },
});

export const { checkAllMailing, checkMailing } = mailingSlice.actions;
