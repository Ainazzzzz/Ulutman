import { createSlice } from '@reduxjs/toolkit';
import { logOut, signIn, signUp } from './authThunk';
import Cookies from 'js-cookie';
import { updateUserProfile } from '../users/profileThunk';

const getInitialState = () => {
   const json = Cookies.get('ULUTMAN');
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
            userId: parsedData.userId,
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
         state.userData.userId = '';

         state.isAuth = false;
         state.error = null;
         state.isLoading = false;
      });

      builder
         .addCase(signIn.fulfilled, (state, action) => {
            state.userData = {
               ...action.payload,
            };
            state.isAuth = true;
            state.isLoading = false;
         })
         .addCase(signIn.pending, state => {
            state.isLoading = true;
         })
         .addCase(signIn.rejected, state => {
            state.isLoading = false;
         });

      builder
         .addCase(signUp.fulfilled, (state, action) => {
            state.userData = action.payload;
            state.isAuth = true;
            state.isLoading = false;
         })
         .addCase(signUp.pending, (state, action) => {
            state.isLoading = true;
         })
         .addCase(signUp.rejected, (state, action) => {
            state.isLoading = false;
         });

      builder;
      builder
         .addCase(updateUserProfile.fulfilled, (state, action) => {
            state.isAuth = true;
            state.isLoading = false;
            state.userData = {
               ...state.userData,
               name: action.payload.username,
               lastName: action.payload.lastName,
               phoneNumber: action.payload.phoneNumber,
               emailAddress: action.payload.emailAddress,
            };
         })
         .addCase(updateUserProfile.pending, state => {
            state.isLoading = true;
         })
         .addCase(updateUserProfile.rejected, state => {
            state.isLoading = false;
         });
   },
});

export const { autoLogin } = authSlice.actions;
