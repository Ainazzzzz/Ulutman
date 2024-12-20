import { createSlice } from '@reduxjs/toolkit'
import { complaintsThunks, getComplaintsFilter } from './complaintsThunks'

export const complaintsSlice = createSlice({
   name: 'complaints',
   initialState: {
      data: [],
      isLoading: false,
   },
   reducers: {
      checkAllComplaints: (state, { payload }) => {
         state.data = payload.data.map(item => {
            if (payload.checked) {
               return { ...item, checked: true }
            }
            return { ...item, checked: false }
         })
      },
      checkCopmlaint: (state, { payload }) => {
         state.data = state.data.map(item => {
            if (item.id === payload.data.id) {
               return { ...item, checked: payload.checked }
            }
            return item
         })
      },
   },

   extraReducers: builder => {
      builder
         .addCase(complaintsThunks.fulfilled, (state, action) => {
            state.data = action.payload
            state.isLoading = false
         })
         .addCase(complaintsThunks.pending, state => {
            state.isLoading = true
         })
         .addCase(complaintsThunks.rejected, state => {
            state.isLoading = true
         })

      builder.addCase(getComplaintsFilter.fulfilled, (state, { payload }) => {
         state.data = payload
      })
   },
})

export const { checkAllComplaints, checkCopmlaint } = complaintsSlice.actions
