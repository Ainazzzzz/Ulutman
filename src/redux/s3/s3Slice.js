import { createSlice } from '@reduxjs/toolkit';
import { sendImageS3 } from './s3Thunk';

export const s3Slice = createSlice({
   name: 's3',
   initialState: {
      images: [],
   },
   extraReducers: builder => {
      builder.addCase(sendImageS3.fulfilled, (state, { payload }) => {
         state.images = state.images.concat(payload);
      });
   },
});
