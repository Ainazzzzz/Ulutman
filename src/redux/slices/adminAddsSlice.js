import { createSlice } from '@reduxjs/toolkit';
import {
   getAdminAdds,
   deleteAdminAds,
   getName,
   getAdminFilter,
} from '../thunks/adminAddThunk';

export const addsAdminSlice = createSlice({
   name: 'adminAdds',
   initialState: {
      adminAdds: [],
   },
   extraReducers: builder => {
      builder
         .addCase(getAdminAdds.fulfilled, (state, action) => {
            state.adminAdds = action.payload;
         })
         .addCase(getName.fulfilled, (state, { payload }) => {
            state.adminAdds = payload;
         })
         .addCase(getAdminFilter.fulfilled, (state, { payload }) => {
            state.adminAdds = payload;
         });
   },
});
