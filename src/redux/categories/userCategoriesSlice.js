import { createSlice } from '@reduxjs/toolkit'

import {
   categoriesFavorite,
   categoriesThunks,
   categoryFilter,
   filtermodalThunks,
   getSubCategory,
   removeFromFavorites,
   searchInputThunks,
} from './userCategoriesThunk'

export const userCategoriesSlice = createSlice({
   name: 'userCategories',
   initialState: {
      categories: [],
      favorites: [],
      filtercategory: [],
   },
   reducers: {},

   extraReducers: builder => {
      builder
         .addCase(categoriesThunks.pending, state => {
            state.loading = true
            state.error = null
         })
         .addCase(categoriesThunks.fulfilled, (state, action) => {
            state.categories = action.payload
         })
         .addCase(categoriesThunks.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
         })

      builder
         .addCase(categoriesFavorite.pending, state => {
            state.loadingFavorites = true
            state.errorFavorites = null
         })
         .addCase(categoriesFavorite.fulfilled, (state, action) => {
            const favoriteItem = action.payload
            if (!state.favorites.find(item => item.id === favoriteItem.id)) {
               state.favorites.push(favoriteItem)
            }
            state.loadingFavorites = false
         })
         .addCase(categoriesFavorite.rejected, (state, action) => {
            state.loadingFavorites = false
            state.errorFavorites = action.error.message
         })

      builder
         .addCase(removeFromFavorites.pending, state => {
            state.loadingRemoveFavorite = true
            state.errorRemoveFavorite = null
         })
         .addCase(removeFromFavorites.fulfilled, (state, action) => {
            const removedItemId = action.meta.arg.id

            state.favorites = state.favorites.filter(
               item => item.id !== removedItemId,
            )

            const categoryIndex = state.categories.findIndex(
               item => item.id === removedItemId,
            )
            if (categoryIndex !== -1) {
               state.categories[categoryIndex].detailFavorite = false
            }

            state.loadingRemoveFavorite = false
         })
         .addCase(removeFromFavorites.rejected, (state, action) => {
            state.loadingRemoveFavorite = false
            state.errorRemoveFavorite = action.error.message
         })

      builder.addCase(categoryFilter.fulfilled, (state, action) => {
         state.categories = action.payload
      })

      builder
         .addCase(filtermodalThunks.pending, state => {
            state.loading = true
            state.errorFilter = null
         })
         .addCase(filtermodalThunks.fulfilled, (state, action) => {
            state.loading = false
            state.categories = action.payload
         })
         .addCase(filtermodalThunks.rejected, (state, action) => {
            state.loading = false
            state.errorFilter = action.error.message
         })

      builder
         .addCase(getSubCategory.pending, state => {
            state.loading = true
         })
         .addCase(getSubCategory.fulfilled, (state, action) => {
            state.loading = false
            state.categories = action.payload
         })
         .addCase(getSubCategory.rejected, state => {
            state.loading = false
            state.error = 'Failed to load subcategory data'
         })

      builder.addCase(searchInputThunks.fulfilled, (state, action) => {
         state.categories = action.payload
      })
   },
})
