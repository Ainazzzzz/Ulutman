import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../config/axiosInstance'
import { showToast } from '../../hooks/useToast'

export const getAllFavorites = createAsyncThunk(
   'favorite/getFavorites',
   async (_, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get('/getAllFavorites')

         return data
      } catch (error) {
         return rejectWithValue(error.response.data)
      }
   },
)
export const deleteAllFavorites = createAsyncThunk(
   'favorites/deleteFavorites',
   async ({ t }, { rejectWithValue, dispatch }) => {
      try {
         const { data } = await axiosInstance.post('/deleteAllFavorites')
         showToast('success', t('toast.favorite.deleteAll'))
         dispatch(getAllFavorites())
         return data
      } catch (error) {
         showToast('error', error.response.data)
         return rejectWithValue(error.response.data)
      }
   },
)

export const deleteFavoritesById = createAsyncThunk(
   'favorite/deleteFavoritesById',
   async ({ id, t }, { rejectWithValue, dispatch }) => {
      try {
         const { data } =  await axiosInstance.delete(`/deleteFromFavorites/${id}`)
         showToast('success', t('toast.favorite.deleteSuccess'))
         dispatch(getAllFavorites())
         return data
      } catch (error) {
         showToast('error', error.response.data)
         return rejectWithValue(
            error.response ? error.response.data : 'Ошибка при удалении',
         )
      }
   },
)
