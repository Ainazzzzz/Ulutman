import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth/authSlice';
import { usersSlice } from './users/usersSlice';
import { dashboardSlices } from './dashboard/dashboardSlices';
import { favoriteSlice } from './users/favoriteSlice';

export const store = configureStore({
   reducer: {
      [authSlice.name]: authSlice.reducer,
      [usersSlice.name]: usersSlice.reducer,
      [dashboardSlices.name]: dashboardSlices.reducer,
      [favoriteSlice.name]: favoriteSlice.reducer,
   },
});
