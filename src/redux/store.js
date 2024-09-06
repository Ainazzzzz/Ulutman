import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth/authSlice';
import { dashboardSlices } from './slices/dashboardSlices';

export const store = configureStore({
   reducer: {
      [authSlice.name]: authSlice.reducer,
      [dashboardSlices.name]: dashboardSlices.reducer,
   },
});
