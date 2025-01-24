import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../config/axiosInstance'

export const uploadToS3Thunks = createAsyncThunk(
   'files/upload',
   async (files, { rejectWithValue }) => {
      try {
         const formData = new FormData()
         files.forEach(file => {
            formData.append('files', file)
         })

         const response = await axiosInstance.post('/S3/upload', formData, {
            headers: {
               'Content-Type': 'multipart/form-data',
            },
         })

         return response.data
      } catch (error) {
         console.error('Error uploading files:', error)
         return rejectWithValue(error.response?.data || error.message)
      }
   },
)
