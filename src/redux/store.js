import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth/authSlice';
import { usersSlice } from './users/usersSlice';

export const store = configureStore({
   reducer: {
      [authSlice.name]: authSlice.reducer,
      [usersSlice.name]: usersSlice.reducer,
   },
});
