import { createSlice } from '@reduxjs/toolkit'
import { getModerationComments } from './moderationThunk'

const initialState = {
   comments: [],
   isLoading: false,
}

export const moderationSlice = createSlice({
   name: 'moderation',
   initialState,
   reducers: {
      checkAllComments: (state, { payload }) => {
         state.comments = payload.data.map(item => {
            if (payload.checked) {
               return { ...item, checked: true }
            }
            return { ...item, checked: false }
         })
      },
      checkComments: (state, { payload }) => {
         state.comments = state.comments.map(item => {
            if (item.userId === payload.data.userId) {
               return { ...item, checked: payload.checked }
            }
            return item
         })
      },
   },
   extraReducers: builder => {
      builder
         .addCase(getModerationComments.fulfilled, (state, action) => {
            state.comments = action.payload
            state.isLoading = false
         })
         .addCase(getModerationComments.pending, state => {
            state.isLoading = true
         })
         .addCase(getModerationComments.rejected, state => {
            state.isLoading = false
         })

      // builder.addCase(
      //    getModerationCommentsFilter.fulfilled,
      //    (state, action) => {
      //       state.comments = action.payload;
      //    },
      // );
   },
})

export const { checkAllComments, checkComments } = moderationSlice.actions
