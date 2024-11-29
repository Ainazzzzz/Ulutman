import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../config/axiosInstance'

export const fetchPublishesUser = createAsyncThunk(
   'publishes/fetchPublishesUser',
   async ({ publishe, publishesData }, { rejectWithValue }) => {
      const { images, ...filteredPublishe } = publishe
      try {
         const params = Object.fromEntries(
            Object.entries(filteredPublishe).filter(
               ([, value]) =>
                  value !== undefined && value !== null && value !== '',
            ),
         )

         const formData = new FormData()
         formData.append('paymentReceiptFile', publishesData.paymentReceiptFile)

         publishesData.images.forEach(image => {
            formData.append(`images`, image)
         })

         const { data } = await axiosInstance.post(
            'publishes/createDetails',
            formData,
            {
               headers: {
                  'Content-Type': 'multipart/form-data',
               },
               params,
            },
         )

         return data
      } catch (error) {
         return rejectWithValue(error.message)
      }
   },
)
