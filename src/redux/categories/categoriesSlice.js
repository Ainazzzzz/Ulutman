import { createSlice } from '@reduxjs/toolkit'
import { filterAdminCategories, getAdminCategories } from './categoriesThunk'

const initialState = {
   categories: [],
   isLoading: false,
   error: '',
}

export const categoriesSlice = createSlice({
   name: 'categories',
   initialState,
   reducers: {
      // checkAllCategories: (state, { payload }) => {
      //    state.categories = payload.data.map(item => {
      //       if (payload.checked) {
      //          return { ...item, checked: true };
      //       }
      //       return { ...item, checked: false };
      //    });
      // },
      // checkCategory: (state, { payload }) => {
      //    state.categories = state.categories.map(item => {
      //       if (item.id === payload.data.id) {
      //          return { ...item, checked: payload.checked };
      //       }
      //       return item;
      //    });
      // },
   },
   extraReducers: builder => {
      builder
         .addCase(getAdminCategories.fulfilled, (state, action) => {
            state.categories = action.payload
            state.isLoading = false
         })
         .addCase(getAdminCategories.pending, state => {
            state.isLoading = true
         })
         .addCase(getAdminCategories.rejected, state => {
            state.isLoading = false
         })

      builder
         .addCase(filterAdminCategories.fulfilled, (state, action) => {
            state.categories = action.payload
            state.isLoading = false
         })
         .addCase(filterAdminCategories.pending, state => {
            state.isLoading = true
         })
         .addCase(filterAdminCategories.rejected, state => {
            state.isLoading = false
         })
   },
})

// export const { checkAllCategories, checkCategory } = categoriesSlice.actions;
