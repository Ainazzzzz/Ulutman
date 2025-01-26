import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../config/axiosInstance'
import { showToast } from '../../hooks/useToast'

export const updateUserProfile = createAsyncThunk(
   'profile/updateUserProfile',
   async ({ profileData, userId, setIsEdit, t }, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.put(`user-accounts/${userId}`, {
            name: profileData.username,
            email: profileData.emailAddress,
         })

         const parsedData = JSON.parse(localStorage.getItem('ULUTMAN') || '{}')
         localStorage.setItem(
            'ULUTMAN',
            JSON.stringify({ ...parsedData, ...data }),
         )

         setIsEdit(false)
         showToast('success', t('toast.profile.success'))

         return data
      } catch (error) {
         return rejectWithValue(error.message)
      }
   },
)
