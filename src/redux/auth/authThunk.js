import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../config/axiosInstance'
import { showToast } from '../../hooks/useToast'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../../config/firebaseConfig'

export const logOut = createAsyncThunk(
   'auth/logOut',
   async ({ navigate, toggleModal }) => {
      navigate('/')

      toggleModal()

      return localStorage.removeItem('ULUTMAN')
   },
)

export const signIn = createAsyncThunk(
   'auth/signIn',
   async ({ userData, onClose }, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.post('auth/sign-in', userData)

         const updatedData = { ...data, role: data.roleName }

         localStorage.setItem('ULUTMAN', JSON.stringify(updatedData))

         showToast('success', 'Успешно')
         onClose()
         console.log(data)

         return updatedData
      } catch (e) {
         const errorMessage = e.response?.data || 'Неверные данные для входа'
         showToast('error', errorMessage)
         return rejectWithValue(errorMessage)
      }
   },
)

export const googleAuth = createAsyncThunk(
   'auth/googleAuth',
   async (_, { rejectWithValue }) => {
      try {
         const result = await signInWithPopup(auth, provider)
         const user = result.user

         const token = await user.getIdToken()
         console.log(token)

         const { data } = await axiosInstance.post(
            'auth/google-login?token=' + token,
         )
         console.log(data, 'data')

         const updatedData = { ...data, role: data.roleName }

         localStorage.setItem('ULUTMAN', JSON.stringify(updatedData))

         showToast('success', 'Успешно')
         onClose()

         return updatedData
      } catch (e) {
         const errorMessage = e.response?.data || 'Неверные данные для входа'
         showToast('error', errorMessage)
         return rejectWithValue(errorMessage)
      }
   },
)

export const signUp = createAsyncThunk(
   'auth/signUp',
   async ({ val, handleOpenSignInModal }, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.post('auth/sign-up', val)

         showToast('success', 'Войдите чтобы продолжить')
         handleOpenSignInModal()
         console.log(data)

         return data
      } catch (e) {
         const errorMessage = e.response?.data || 'Неверные данные для входа'
         showToast('error', errorMessage)
         return rejectWithValue(errorMessage)
      }
   },
)

export const addAdmin = createAsyncThunk(
   'auth/createAdmin',
   async ({ adminData, navigate }, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.post('admin/sign-up', {
            ...adminData,
            status: 'АКТИВНЫЙ',
         })

         navigate(-1)
         showToast('success', 'Успешно добавлено')

         return data
      } catch (e) {
         const errorMessage = e.response?.data || 'Неверные данные для входа'
         showToast('error', errorMessage)
         return rejectWithValue(errorMessage)
      }
   },
)
