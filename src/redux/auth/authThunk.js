import { createAsyncThunk } from '@reduxjs/toolkit';

export const logOut = createAsyncThunk('auth/logOut', async () => {
   return localStorage.removeItem('ULUTMAN');
});
