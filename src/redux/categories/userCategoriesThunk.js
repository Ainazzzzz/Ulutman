import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../config/axiosInstance'
import { showToast } from '../../hooks/useToast'

export const categoriesThunks = createAsyncThunk(
   'categories/get',
   async ({ subCategory }, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get(
            `main-page/${subCategory === 'real_estate' ? 'realEstate' : subCategory}`,
         )

         return data
      } catch (e) {
         return rejectWithValue()
      }
   },
)

export const getSubCategory = createAsyncThunk(
   'subcategory/get',
   async ({ category, subCategory }, { rejectWithValue }) => {
      let transformedCategory =
         category === 'real_estate' ? 'real-estate' : category
      try {
         const { data } = await axiosInstance.get(
            `/main-page/${transformedCategory}/subcategory/${subCategory}`,
         )

         return data
      } catch (e) {
         return rejectWithValue()
      }
   },
)

export const categoriesFavorite = createAsyncThunk(
   'categoriesfavorite/post',
   async ({ id, subCategory }, { rejectWithValue, dispatch }) => {
      try {
         const { data } = await axiosInstance.post(`/addToFavorites/${id}`)

         showToast('success', 'Успешно добавлено в избранное')

         dispatch(categoriesThunks({ subCategory }))
         return data
      } catch (e) {
         return rejectWithValue()
      }
   },
)

export const removeFromFavorites = createAsyncThunk(
   'categoriesfavorite/delete',
   async ({ id, subCategory }, { rejectWithValue, dispatch }) => {
      try {
         const { data } = await axiosInstance.delete(
            `/deleteFromFavorites/${id}`,
         )

         showToast('success', 'Успешно удалено в избранное')

         dispatch(categoriesThunks({ subCategory }))
         return data
      } catch (e) {
         console.error('Ошибка при удалении из избранного:', e.response?.data)
         return rejectWithValue(e.response?.data || 'Ошибка удаления')
      }
   },
)

export const categoryFilter = createAsyncThunk(
   'categoryfilter/filter',
   async (filters, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get('/main-page/filter', {
            params: {
               categories: filters.categories?.join(','),
               sortBy: filters.sortBy || 'price',
            },
         })

         return data
      } catch (error) {
         return rejectWithValue(error.message)
      }
   },
)
export const filtermodalThunks = createAsyncThunk(
   'filtermodal/get',
   async ({ filterData }, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get('/publishes/filter', {
            params: filterData,
         })

         return data
      } catch (e) {
         console.error('Error:', e.response?.data || e.message)
         return rejectWithValue(e.response?.data || e.message)
      }
   },
)

export const searchInputThunks = createAsyncThunk(
   'searchinput/get',
   async (serializedParams, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get(
            `/main-page/search${serializedParams}`,
         )

         return data
      } catch (e) {
         console.error('Error:', e.response?.data || e.message)
         return rejectWithValue(e.response?.data || e.message)
      }
   },
)

export const resertFilterThunks = createAsyncThunk(
   'resertfilter/get',
   async (_, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get('/publishes/resetFilter')

         return data
      } catch (e) {
         console.error('Error:', e.response?.data || e.message)
         return rejectWithValue(e.response?.data || e.message)
      }
   },
)
