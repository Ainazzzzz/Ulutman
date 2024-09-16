import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth/authSlice';
<<<<<<< HEAD
import { addsAdminSlice } from './slices/adminAddsSlice';
=======
import { usersSlice } from './users/usersSlice';
import { dashboardSlices } from './dashboard/dashboardSlices';
>>>>>>> 704dcc3eae05cbfbe61e8c7949a3f1140260a6ab

export const store = configureStore({
   reducer: {
      [authSlice.name]: authSlice.reducer,
<<<<<<< HEAD
      [addsAdminSlice.name]: addsAdminSlice.reducer,
=======
      [usersSlice.name]: usersSlice.reducer,
      [dashboardSlices.name]: dashboardSlices.reducer,
>>>>>>> 704dcc3eae05cbfbe61e8c7949a3f1140260a6ab
   },
});
