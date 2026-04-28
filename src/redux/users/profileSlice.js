import { createSlice } from '@reduxjs/toolkit'
import { updateUserProfile } from './profileThunk'

const initialState = {
   userData: {},
}

export const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {},
   extraReducers: builder => {
      builder.addCase(updateUserProfile.fulfilled, (state, action) => {
         state.userData = {
            ...state.userData,
            ...action.payload,
         }
      })
   },
})
