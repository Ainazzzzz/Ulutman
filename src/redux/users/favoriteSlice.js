import { createSlice } from '@reduxjs/toolkit'
import {
   deleteAllFavorites,
   deleteFavoritesById,
   getAllFavorites,
} from './favoriteThunk'

export const favoriteSlice = createSlice({
   name: 'favoriteProducts',
   initialState: {
      favoriteProducts: {},
      isFavorite: false,
      isLoading: false,
   },
   extraReducers: builder => {
      builder
         .addCase(getAllFavorites.pending, (state, action) => {
            state.isLoading = true
         })
         .addCase(getAllFavorites.fulfilled, (state, action) => {
            state.favoriteProducts = action.payload
            state.isLoading = false
         })
         .addCase(getAllFavorites.rejected, (state, action) => {
            state.isLoading = false
         })

         .addCase(deleteAllFavorites.fulfilled, (state, action) => {
            state.favoriteProducts = action.payload
         })

         .addCase(deleteFavoritesById.fulfilled, (state, action) => {
            const productId = action.payload
            delete state.favoriteProducts[productId]
         })
   },
})
