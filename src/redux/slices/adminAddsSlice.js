import { createSlice } from '@reduxjs/toolkit';
import { getAdminAdds, getName, getAdminFilter } from '../thunks/adminAddThunk';

export const addsAdminSlice = createSlice({
   name: 'adminAdds',
   initialState: {
      adminAdds: [],
      isLoading: false,
   },
   reducers: {
      checkAllAds: (state, { payload }) => {
         state.adminAdds = payload.data.map(item => {
            if (payload.checked) {
               return { ...item, checked: true };
            }
            return { ...item, checked: false };
         });
      },
      checkAds: (state, { payload }) => {
         state.adminAdds = state.adminAdds.map(item => {
            if (item.id === payload.data.id) {
               return { ...item, checked: payload.checked };
            }
            return item;
         });
      },
   },
   extraReducers: builder => {
      builder
         .addCase(getAdminAdds.fulfilled, (state, action) => {
            state.adminAdds = action.payload;
            state.isLoading = false;
         })
         .addCase(getAdminAdds.pending, state => {
            state.isLoading = true;
         })
         .addCase(getAdminAdds.rejected, state => {
            state.isLoading = false;
         });

      builder
         .addCase(getName.fulfilled, (state, { payload }) => {
            state.adminAdds = payload;
            state.isLoading = false;
         })
         .addCase(getName.pending, state => {
            state.isLoading = true;
         })
         .addCase(getName.rejected, state => {
            state.isLoading = false;
         });

      builder
         .addCase(getAdminFilter.fulfilled, (state, { payload }) => {
            state.adminAdds = payload;
            state.isLoading = false;
         })
         .addCase(getAdminFilter.pending, state => {
            state.isLoading = true;
         })
         .addCase(getAdminFilter.rejected, state => {
            state.isLoading = false;
         });
   },
});

export const { checkAds, checkAllAds } = addsAdminSlice.actions;
