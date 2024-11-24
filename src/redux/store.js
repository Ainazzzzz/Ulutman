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
<<<<<<< HEAD
import { myAdsSlice } from './users/myAdsSlice';
=======
import { fileSlice } from './files/fileSlice';
>>>>>>> 8f69ec7750e84a5babc5ce287cac839e768d9e9a

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
      [myAdsSlice.name]: myAdsSlice.reducer,
      [mailingSlice.name]: mailingSlice.reducer,
      [categoriesSlice.name]: categoriesSlice.reducer,
      [fileSlice.name]: fileSlice.reducer,
   },
});
