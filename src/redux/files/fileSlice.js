import { createSlice } from '@reduxjs/toolkit'
import { postFile } from './fileThunk'

const initialState = {
   fileUrl: '',
   isLoading: false,
   error: '',
}

export const fileSlice = createSlice({
   name: 'file',
   initialState,
   reducers: {},
   extraReducers: builder => {
      builder
         .addCase(postFile.fulfilled, (state, action) => {
            state.fileUrl = action.payload
            state.isLoading = false
            state.error = ''
         })
         .addCase(postFile.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
         })
         .addCase(postFile.pending, state => {
            state.isLoading = true
            state.error = ''
         })
   },
})
