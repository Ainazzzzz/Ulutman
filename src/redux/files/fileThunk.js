import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../config/axiosInstance'

export const postFile = createAsyncThunk(
   'file/post',
   async (file, { rejectWithValue }) => {
      const formData = new FormData()
      formData.append('files', file)

      try {
         const { data } = await axiosInstance.post('/S3/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
         })

         return data
      } catch (error) {
         return rejectWithValue(error)
      }
   },
)
