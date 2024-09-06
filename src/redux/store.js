import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth/authSlice';
import { addsAdminSlice } from './slices/adminAddsSlice';

export const store = configureStore({
   reducer: {
      [authSlice.name]: authSlice.reducer,
      [addsAdminSlice.name]: addsAdminSlice.reducer,
   },
});
