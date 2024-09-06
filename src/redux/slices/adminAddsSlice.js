import { createSlice } from '@reduxjs/toolkit';
import { getAdminAdds } from '../thunks/adminAddThunk';

export const addsAdminSlice = createSlice({
   name: 'adminAdds',
   initialState: {
      adminAdds: [],
   },
   extraReducers: builder => {
      builder.addCase(getAdminAdds.fulfilled, (state, action) => {
         state.adminAdds = action.payload;
      });
   },
});
