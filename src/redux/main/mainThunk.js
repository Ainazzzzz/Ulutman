import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../config/axiosInstance'
import { showToast } from '../../hooks/useToast'

export const getMainAds = createAsyncThunk(
   'main/getMainAds',
   async (_, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get('publishes/getAll')
         return data
      } catch (error) {
         return rejectWithValue(error.message)
      }
   },
)

export const updateFavoriteStatus = createAsyncThunk(
   'main/updateFavoriteStatus',
   async ({ id, t }, { rejectWithValue, dispatch }) => {
      try {
         await axiosInstance.post(`addToFavorites/${id}`)
         showToast('success', t('toast.favorite.success'))
         return dispatch(getMainAds())
      } catch (error) {
         showToast('error', error.response.data)

         return rejectWithValue(error.message)
      }
   },
)

export const deleteFavoriteStatus = createAsyncThunk(
   'main/deleteFavoriteStatus',
   async ({ id, t }, { rejectWithValue, dispatch }) => {
      try {
         await axiosInstance.delete(`deleteFromFavorites/${id}`)
         showToast('success', t('toast.favorite.deleteSuccess'))

         return dispatch(getMainAds())
      } catch (error) {
         showToast('error', error.response.data)
         return rejectWithValue(error.message)
      }
   },
)

export const sortPublishesRequest = createAsyncThunk(
   'main/sortPublishesRequest',
   async (category = '', { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get(
            `main-page/filter?sortBy=${category}`,
         )
         return data
      } catch (error) {
         return rejectWithValue(error.message)
      }
   },
)

export const searchCategoryAndMetroRequest = createAsyncThunk(
   'main/searchCategoryAndMetroRequest',
   async (mainData, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get(`main-page/search${mainData}`)

         return data
      } catch (error) {
         return rejectWithValue(error.message)
      }
   },
)

export const getAllMetros = createAsyncThunk(
   'main/getAllMetros',
   async (_, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get(`main-page/all/metro`)

         return data
      } catch (error) {
         return rejectWithValue(error.message)
      }
   },
)
