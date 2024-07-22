import { createSlice } from '@reduxjs/toolkit';
import { logOut } from './authThunk';

const getInitialState = () => {
   const json = localStorage.getItem('ULUTMAN');
   if (json) {
      const userData = JSON.parse(json);
      return {
         isAuth: true,
         token: userData.token,
         email: userData.email,
         role: userData.role,
         firstName: userData.firstName,
         lastName: userData.lastName,
         isLoading: false,
         error: null,
      };
   }

   return {
      firstName: '',
      lastName: '',
      email: '',
      token: '',
      role: 'GUEST',
      isAuth: false,
      isLoading: false,
      error: null,
   };
};

export const authSlice = createSlice({
   name: 'auth',
   initialState: getInitialState(),
   reducers: {
      autoLogin: (state, { payload }) => {
         state.role = payload.role;
         state.firstName = payload.firstName;
         state.lastName = payload.lastName;
         state.email = payload.email;
         state.token = payload.token;
         state.isAuth = true;
      },
   },

   extraReducers: builder => {
      builder.addCase(logOut.fulfilled, state => {
         state.role = 'GUEST';
         state.isAuth = false;
         state.firstName = '';
         state.lastName = '';
         state.email = '';
         state.token = '';

         state.error = null;
         state.isLoading = false;
      });
   },
});

export const { autoLogin } = authSlice.actions;
