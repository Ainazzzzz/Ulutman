import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth/authSlice';
import { moderationSlice } from './moderation/moderationSlice';
import { complaintsSlice } from './complaints.Slice';
import { addsAdminSlice } from './slices/adminAddsSlice';
import { usersSlice } from './users/usersSlice';
import { dashboardSlices } from './dashboard/dashboardSlices';

export const store = configureStore({
   reducer: {
      [authSlice.name]: authSlice.reducer,
      [moderationSlice.name]: moderationSlice.reducer,
      [complaintsSlice.name]: complaintsSlice.reducer,
      [usersSlice.name]: usersSlice.reducer,
      [dashboardSlices.name]: dashboardSlices.reducer,
      [addsAdminSlice.name]: addsAdminSlice.reducer,
   },
});
