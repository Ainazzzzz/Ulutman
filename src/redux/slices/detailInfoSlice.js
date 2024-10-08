import { createSlice } from '@reduxjs/toolkit';
import { getDetailInfo } from '../thunks/detailInfoThunk';

export const detailInfoSlice = createSlice({
   name: 'detailInfo',
   initialState: {
      detailInfo: {},
   },
   extraReducers: builder => {
      builder.addCase(getDetailInfo.fulfilled, (state, action) => {
         console.log(action.payload);
         state.detailInfo = action.payload;
      });
   },
});
