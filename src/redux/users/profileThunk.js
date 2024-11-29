import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../config/axiosInstance'

export const updateUserProfile = createAsyncThunk(
   'profile/updateUserProfile',
   async ({ profileData, userId }, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.put(
            `user-accounts/${userId}`,
            profileData,
         )

         const parsedData = JSON.parse(localStorage.getItem('ULUTMAN') || '{}')
         localStorage.setItem(
            'ULUTMAN',
            JSON.stringify({ ...parsedData, ...data, name: data.username }),
         )

         return data
      } catch (error) {
         return rejectWithValue(error.message)
      }
   },
)
