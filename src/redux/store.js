import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth/authSlice';
import { complaintsSlice } from './complaints.Slice';
import { addsAdminSlice } from './slices/adminAddsSlice';
import { usersSlice } from './users/usersSlice';
import { dashboardSlices } from './dashboard/dashboardSlices';
import { mainSlice } from './main/mainSlice';
import { publishesSlice } from './publishes/publishesSlice';

export const store = configureStore({
   reducer: {
      [authSlice.name]: authSlice.reducer,
      [complaintsSlice.name]: complaintsSlice.reducer,
      [usersSlice.name]: usersSlice.reducer,
      [dashboardSlices.name]: dashboardSlices.reducer,
      [mainSlice.name]: mainSlice.reducer,
      [publishesSlice.name]: publishesSlice.reducer,
      [addsAdminSlice.name]: addsAdminSlice.reducer,
   },
});
