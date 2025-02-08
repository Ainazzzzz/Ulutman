import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../config/axiosInstance'
import { showToast } from '../../hooks/useToast'

export const fetchPublishesUser = createAsyncThunk(
   'publishes/fetchPublishesUser',
   async ({ publishe, navigate, t }, { rejectWithValue }) => {
      const { images, city, paymentReceiptFile, ...filteredPublishe } = publishe
      try {
         const params = Object.fromEntries(
            Object.entries(filteredPublishe).filter(
               ([, value]) =>
                  value !== undefined && value !== null && value !== '',
            ),
         )

         const formData = new FormData()
         formData.append('paymentReceiptFile', paymentReceiptFile[0])

         publishe.images.forEach(image => {
            formData.append(`images`, image)
         })

         const { data } = await axiosInstance.post(
            'publishes/create',
            formData,
            {
               headers: {
                  'Content-Type': 'multipart/form-data',
               },

               params: { ...params, subcategory: params.subcategory.value },
            },
         )
         showToast('success', t('toast.publishes.success'))
         navigate('/user')

         return data
      } catch (error) {
         showToast('error', error.response.data)
         console.error(error)
         return rejectWithValue(error.message)
      }
   },
)
