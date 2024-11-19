import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth/authSlice';
import { moderationSlice } from './moderation/moderationSlice';
import { complaintsSlice } from './complaints.Slice';
import { addsAdminSlice } from './slices/adminAddsSlice';
import { usersSlice } from './users/usersSlice';
import { dashboardSlices } from './dashboard/dashboardSlices';
import { favoriteSlice } from './users/favoriteSlice';
import { mainSlice } from './main/mainSlice';
import { mailingSlice } from './mailing/mailingSlice';
import { categoriesSlice } from './categories/categoriesSlice';
import { publishesSlice } from './publishes/publishesSlice';
import { detailInfoSlice } from './slices/detailInfoSlice';

export const store = configureStore({
   reducer: {
      [authSlice.name]: authSlice.reducer,
      [moderationSlice.name]: moderationSlice.reducer,
      [complaintsSlice.name]: complaintsSlice.reducer,
      [usersSlice.name]: usersSlice.reducer,
      [dashboardSlices.name]: dashboardSlices.reducer,
      [favoriteSlice.name]: favoriteSlice.reducer,
      [mainSlice.name]: mainSlice.reducer,
      [publishesSlice.name]: publishesSlice.reducer,
      [addsAdminSlice.name]: addsAdminSlice.reducer,
<<<<<<< HEAD
      [detailInfoSlice.name]: detailInfoSlice.reducer,
=======
      [mailingSlice.name]: mailingSlice.reducer,
      [categoriesSlice.name]: categoriesSlice.reducer,
>>>>>>> f45b30c7c8471f93d9cf89aba2bebdf9012fa736
   },
});
