import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../config/axiosInstance'

export const fetchPublishesUser = createAsyncThunk(
   'publishes/fetchPublishesUser',
   async ({ publishe }, { rejectWithValue }) => {
      const { images, city, paymentReceiptFile, ...filteredPublishe } = publishe
      try {
         const { title, ...params } = Object.fromEntries(
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
               // params: {
               //    title: 'Aziat',
               //    description: 'description',
               //    metro: 'БиблиотекаИмениЛенина',
               //    address: 'Улица Крылова дом 1',
               //    phoneNumber: '+71234567891',
               //    price: 1234,
               //    category: 'REAL_ESTATE',
               //    subcategory: 'House',
               //    bank: 'Уралсиб',
               //    userId: 4,
               // },
               params: { ...params, subcategory: params.subcategory.value },
            },
         )

         return data
      } catch (error) {
         return rejectWithValue(error.message)
      }
   },
)
