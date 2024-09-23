import { createSlice } from '@reduxjs/toolkit';
import { logOut, signIn, signUp } from './authThunk';

const getInitialState = () => {
   const json = localStorage.getItem('ULUTMAN');
   if (json) {
      const parsedData = JSON.parse(json);
      return {
         isAuth: true,
         isLoading: false,
         error: null,

         userData: {
            token: parsedData.token,
            email: parsedData.email,
            role: parsedData.role,
            name: parsedData.name,
            status: parsedData.status,
         },
      };
   }

   return {
      isAuth: false,
      isLoading: false,
      error: null,
      userData: {
         name: '',
         email: '',
         status: '',
         token: '',
         role: 'GUEST',
         userId: '',
      },
   };
};

export const authSlice = createSlice({
   name: 'auth',
   initialState: getInitialState(),
   reducers: {
      autoLogin: (state, { payload }) => {
         state.userData = payload;
         state.isAuth = true;
      },
   },

   extraReducers: builder => {
      builder.addCase(logOut.fulfilled, state => {
         state.userData.role = 'GUEST';
         state.userData.name = '';
         state.userData.status = '';
         state.userData.email = '';
         state.userData.token = '';

         state.isAuth = false;
         state.error = null;
         state.isLoading = false;
      });

      builder.addCase(signIn.fulfilled, (state, action) => {
         state.userData = {
            ...action.payload,
         };
         state.isAuth = true;
      });

      builder.addCase(signUp.fulfilled, (state, action) => {
         state.userData = action.payload;
         state.isAuth = true;
      });
   },
});

export const { autoLogin } = authSlice.actions;
