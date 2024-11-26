import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../config/axiosInstance'

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
