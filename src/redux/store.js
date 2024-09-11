import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth/authSlice';
import { complaintsSlice } from './complaints.Slice';

export const store = configureStore({
   reducer: {
      [authSlice.name]: authSlice.reducer,
      [complaintsSlice.name]: complaintsSlice.reducer,
   },
});
