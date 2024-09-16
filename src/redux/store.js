import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth/authSlice';
import { moderationSlice } from './moderation/moderationSlice';
import { dashboardSlices } from './dashboard/dashboardSlices';

export const store = configureStore({
   reducer: {
      [authSlice.name]: authSlice.reducer,
      [moderationSlice.name]: moderationSlice.reducer,
      [dashboardSlices.name]: dashboardSlices.reducer,
   },
});
