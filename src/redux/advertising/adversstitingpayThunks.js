import { createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { axiosInstance } from '../../config/axiosInstance'

export const addAdvertisingThunks = createAsyncThunk(
   'advertising/add',
   async (
      { bank, imageFile, paymentReceiptFile, setIsLoading, t },
      { rejectWithValue },
   ) => {
      try {
         const formData = new FormData()

         formData.append('imageFile', imageFile)
         formData.append('paymentReceiptFile', paymentReceiptFile)

         const response = await axiosInstance.post(
            `/advertising?bank=${bank}`,
            formData,
            {
               headers: {
                  'Content-Type': 'multipart/form-data',
               },
            },
         )

         toast.success(t('toast.advertisingSuccess'), {
            position: 'top-right',
            autoClose: 5000,
         })

         setIsLoading(false)

         return response.data
      } catch (error) {
         console.error('Error adding advertising:', error)
         return rejectWithValue(error.response?.data || error.message)
      }
   },
)
