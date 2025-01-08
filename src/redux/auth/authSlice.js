import { createSlice } from '@reduxjs/toolkit'
import { addAdmin, googleAuth, logOut, signIn, signUp } from './authThunk'
import { updateUserProfile } from '../users/profileThunk'

const parseStoredData = json => {
   try {
      const parsedData = JSON.parse(json)
      if (parsedData.token && parsedData.email && parsedData.userId) {
         return parsedData
      }
   } catch (error) {
      localStorage.removeItem('ULUTMAN')
   }
   return null
}

const getInitialState = () => {
   const json = localStorage.getItem('ULUTMAN')
   const parsedData = json ? parseStoredData(json) : null

   if (parsedData) {
      return {
         isAuth: true,
         isLoading: false,
         error: null,
         userData: {
            token: parsedData.token,
            email: parsedData.email,
            role: parsedData.role || 'GUEST',
            name: parsedData.name || '',
            status: parsedData.status || '',
            userId: parsedData.userId,
            photoUrl: parsedData.photoUrl || '',
         },
      }
   }

   return {
      isAuth: false,
      isLoading: false,
      error: null,
      userData: {
         token: '',
         email: '',
         role: 'GUEST',
         name: '',
         status: '',
         userId: '',
         photoUrl: '',
      },
   }
}

export const authSlice = createSlice({
   name: 'auth',
   initialState: getInitialState(),
   reducers: {
      autoLogin: (state, { payload }) => {
         state.userData = payload
         state.isAuth = true
      },
   },

   extraReducers: builder => {
      builder.addCase(logOut.fulfilled, state => {
         state.userData.role = 'GUEST'
         state.userData.name = ''
         state.userData.status = ''
         state.userData.email = ''
         state.userData.token = ''
         state.userData.userId = ''
         state.isAuth = false
         state.error = null
         state.isLoading = false
      })
      builder.addCase(googleAuth.fulfilled, (state, action) => {
         console.log('GoogleAuth fulfilled:', action.payload)
         state.userData = action.payload
         state.isAuth = true
         state.isLoading = false
      })

      builder
         .addCase(signIn.fulfilled, (state, action) => {
            state.userData = {
               ...action.payload,
            }
            state.isAuth = true
            state.isLoading = false
         })
         .addCase(signIn.pending, state => {
            state.isLoading = true
         })
         .addCase(signIn.rejected, state => {
            state.isLoading = false
         })

      builder
         .addCase(signUp.fulfilled, state => {
            state.isAuth = true
            state.isLoading = false
         })
         .addCase(signUp.pending, state => {
            state.isLoading = true
         })
         .addCase(signUp.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
         })

      builder
         .addCase(updateUserProfile.fulfilled, (state, action) => {
            state.isAuth = true
            state.isLoading = false
            state.userData = {
               ...state.userData,
               name: action.payload.username,
               lastName: action.payload.lastName,
               phoneNumber: action.payload.phoneNumber,
               emailAddress: action.payload.emailAddress,
            }
         })
         .addCase(updateUserProfile.pending, state => {
            state.isLoading = true
         })
         .addCase(updateUserProfile.rejected, state => {
            state.isLoading = false
         })

      builder
         .addCase(addAdmin.fulfilled, state => {
            state.isLoading = false
         })
         .addCase(addAdmin.pending, state => {
            state.isLoading = true
         })
         .addCase(addAdmin.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
         })

      builder
         .addCase(forgotPassword.fulfilled, state => {
            state.isLoading = false
         })
         .addCase(forgotPassword.pending, state => {
            state.isLoading = true
         })
         .addCase(forgotPassword.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
         })
   },
})

export const { autoLogin } = authSlice.actions
