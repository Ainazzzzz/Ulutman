import { createSlice } from '@reduxjs/toolkit'
import {
   getAdvertising,
   getAdvertisingDeactive,
   postAdvertisingActivated,
} from './advertisingThunk'

const initialState = {
   advertising: [],
   deactivatedAdvertising: [],
   isLoading: false,
   isDeactivatedLoading: false,
   isActivating: false,
   error: '',
}

export const advertisingSlice = createSlice({
   name: 'advertising',
   initialState,
   reducers: {},
   extraReducers: builder => {
      builder
         .addCase(getAdvertising.fulfilled, (state, action) => {
            state.advertising = action.payload
            state.isLoading = false
            state.error = ''
         })
         .addCase(getAdvertising.pending, state => {
            state.isLoading = true
            state.error = ''
         })
         .addCase(getAdvertising.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
         })
         .addCase(getAdvertisingDeactive.fulfilled, (state, action) => {
            state.deactivatedAdvertising = action.payload
            state.isDeactivatedLoading = false
            state.error = ''
         })
         .addCase(getAdvertisingDeactive.pending, state => {
            state.isDeactivatedLoading = true
            state.error = ''
         })
         .addCase(getAdvertisingDeactive.rejected, (state, action) => {
            state.isDeactivatedLoading = false
            state.error = action.payload
         })
         .addCase(postAdvertisingActivated.fulfilled, state => {
            state.isActivating = false
            state.error = ''
         })
         .addCase(postAdvertisingActivated.pending, state => {
            state.isActivating = true
         })
         .addCase(postAdvertisingActivated.rejected, (state, action) => {
            state.isActivating = false
            state.error = action.payload
         })
   },
})
