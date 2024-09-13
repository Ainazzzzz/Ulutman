import { createSlice } from '@reduxjs/toolkit';
import { getModerationComments } from './moderationThunk';

const initialState = {
   comments: [],
};

export const moderationSlice = createSlice({
   name: 'moderation',
   initialState,
   reducers: {},
   extraReducers: builder => {
      builder.addCase(getModerationComments.fulfilled, (state, action) => {
         state.comments = action.payload;
      });
   },
});
