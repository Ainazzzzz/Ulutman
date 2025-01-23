import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../config/axiosInstance'
import { showToast } from '../../hooks/useToast'

export const getAdvertising = createAsyncThunk(
   'advertising/get',
   async (_, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get('/advertising')
         return data
      } catch (error) {
         return rejectWithValue(error)
      }
   },
)

export const getAdvertisingDeactive = createAsyncThunk(
   'advertising/getDeactivated',
   async (_, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get(
            '/manage/adversting/deactivated',
         )

         return data
      } catch (error) {
         return rejectWithValue(error)
      }
   },
)
export const postAdvertisingActivated = createAsyncThunk(
   'advertising/postActivated',
   async (id, { rejectWithValue, dispatch }) => {
      try {
         const { data } = await axiosInstance.post(
            `/manage/adversting/activate/${id}`,
         )
         showToast('success', 'Публикация активирована успешно!')
         dispatch(getAdvertisingDeactive())
         return data
      } catch (error) {
         showToast('error', error.message)
         return rejectWithValue(error)
      }
   },
)
