import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth/authSlice'
import { moderationSlice } from './moderation/moderationSlice'
import { complaintsSlice } from './complaints.Slice'
import { addsAdminSlice } from './slices/adminAddsSlice'
import { usersSlice } from './users/usersSlice'
import { dashboardSlices } from './dashboard/dashboardSlices'
import { favoriteSlice } from './users/favoriteSlice'
import { mainSlice } from './main/mainSlice'
import { mailingSlice } from './mailing/mailingSlice'
import { categoriesSlice } from './categories/categoriesSlice'
import { publishesSlice } from './publishes/publishesSlice'
import { s3Slice } from './s3/s3Slice'
import { fileSlice } from './files/fileSlice'
import { advertisingSlice } from './advertising/advertisingSlice'

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
      [mailingSlice.name]: mailingSlice.reducer,
      [categoriesSlice.name]: categoriesSlice.reducer,
      [s3Slice.name]: s3Slice.reducer,
      [fileSlice.name]: fileSlice.reducer,
      [advertisingSlice.name]: advertisingSlice.reducer,
   },
})
