import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../config/axiosInstance'
import { showToast } from '../../hooks/useToast'

export const getDetailInfo = createAsyncThunk(
   'detailInfo/getDetailInfo',
   async ({ id }, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get(`publishes/find/${id}`)

         return data
      } catch (error) {
         return rejectWithValue(error.response.data)
      }
   },
)

export const postFavorite = createAsyncThunk(
   'favorite/postFavorite',
   async ({ id, t }, { rejectWithValue, dispatch }) => {
      try {
         const { data } = await axiosInstance.post(`addToFavorites/${id}`)
         dispatch(getDetailInfo({ id }))
         showToast('success', t('toast.favorite.success'))
         return data
      } catch (error) {
         showToast('error', error.response.data)
         return rejectWithValue(error.response.data)
      }
   },
)

export const deleteFavorite = createAsyncThunk(
   'favorite/deleteFavorite',
   async ({ id, t }, { rejectWithValue, dispatch }) => {
      try {
         const { data } = await axiosInstance.delete(
            `deleteFromFavorites/${id}`,
         )
         dispatch(getDetailInfo({ id }))
         showToast('success', t('toast.favorite.deleteSuccess'))

         return data
      } catch (error) {
         showToast('error', error.response.data)
         return rejectWithValue(error.response.data)
      }
   },
)

export const getSimilarAds = createAsyncThunk(
   'similarAds/getSimilarAds',
   async (_, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get('publishes/getAll')

         return data
      } catch (error) {
         return rejectWithValue(error.response.data)
      }
   },
)
