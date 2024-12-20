import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../config/axiosInstance'
import { showToast } from '../../hooks/useToast'

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

         return updatedData
      } catch (e) {
         const errorMessage = e.response?.data || 'Что-то пошло не так'
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

         return data
      } catch (e) {
         const errorMessage = e.response?.data || 'Что-то пошло не так'
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
         const errorMessage = e.response?.data || 'Что-то пошло не так'
         showToast('error', errorMessage)
         return rejectWithValue(errorMessage)
      }
   },
)

export const forgotPassword = createAsyncThunk(
   'auth/forgotPassword',
   async (
      { email, toggleResetPasswordModal, onClose },
      { rejectWithValue },
   ) => {
      try {
         const { data } = await axiosInstance.get(
            `/mailing/sendPasswordResetCode?email=${email}`,
         )

         showToast('success', `На почту ${email} отправлен код`)
         toggleResetPasswordModal()
         onClose()

         return data
      } catch (e) {
         const errorMessage = e.response?.data || 'Что-то пошло не так'
         showToast('error', errorMessage)
         return rejectWithValue(errorMessage)
      }
   },
)

export const resetPassword = createAsyncThunk(
   'auth/resetPassword',
   async ({ formData, toggleSignInModal, onClose }, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.post(
            '/mailing/resetPassword',
            undefined,
            {
               params: formData,
            },
         )
         showToast('success', `Пароль успешно изменён`)

         toggleSignInModal()
         onClose()

         return data
      } catch (e) {
         const errorMessage = e.response?.data || 'Что-то пошло не так'
         showToast('error', errorMessage)
         return rejectWithValue(errorMessage)
      }
   },
)
