import { createAsyncThunk } from '@reduxjs/toolkit'
import { signInWithPopup } from 'firebase/auth'
import { axiosInstance } from '../../config/axiosInstance'
import { showToast } from '../../hooks/useToast'
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
   async ({ userData, onClose, t }, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.post('auth/sign-in', userData)

         const updatedData = { ...data, role: data.roleName }

         localStorage.setItem('ULUTMAN', JSON.stringify(updatedData))

         showToast('success', t('toast.signIn.success'))
         onClose()

         return updatedData
      } catch (e) {
         const errorMessage = e.response?.data || t('toast.signIn.error')
         showToast('error', errorMessage)
         return rejectWithValue(errorMessage)
      }
   },
)

export const googleAuth = createAsyncThunk(
   'auth/googleAuth',
   async (_, { rejectWithValue }) => {
      try {
         const { user } = await signInWithPopup(auth, provider)

         const token = await user.getIdToken()

         const params = new URLSearchParams({ token })
         const { data } = await axiosInstance.post(
            `auth/google-login?${params}`,
         )

         const updatedData = {
            token: data.token,
            email: data.email,
            role: data.role || 'GUEST',
            name: data.name || user.displayName,
            status: data.status || '',
            userId: data.userId || data.localId,
            photoUrl: data.photoUrl || user.photoUrl || '',
         }

         localStorage.setItem('ULUTMAN', JSON.stringify(updatedData))

         showToast('success', 'Успешно')

         return updatedData
      } catch (e) {
         const errorMessage = e.response?.data
         console.error('Ошибка авторизации:', e)
         showToast('error', errorMessage)
         return rejectWithValue(errorMessage)
      }
   },
)

export const signUp = createAsyncThunk(
   'auth/signUp',
   async ({ val, handleOpenSignInModal, t }, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.post('auth/sign-up', val)

         showToast('success', t('toast.signUp.success'))
         handleOpenSignInModal()

         return data
      } catch (e) {
         const errorMessage = e.response?.data || t('toast.signIn.error')
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
      { email, toggleResetPasswordModal, onClose, t },
      { rejectWithValue },
   ) => {
      try {
         const { data } = await axiosInstance.get(
            `/auth/sendPasswordResetCode?email=${email}`,
         )

         showToast('success', `${t('toast.forgot.success')} ${email}`)
         toggleResetPasswordModal()
         onClose()
         toggleResetPasswordModal()

         return data
      } catch (e) {
         const errorMessage = e.response?.data || t('toast.forgot.error')
         showToast('error', errorMessage)
         return rejectWithValue(errorMessage)
      }
   },
)

export const resetPassword = createAsyncThunk(
   'auth/resetPassword',
   async ({ formData, toggleSignInModal, onClose, t }, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.post(
            '/auth/resetPassword',
            undefined,
            {
               params: formData,
            },
         )
         showToast('success', t('toast.reset.success'))

         toggleSignInModal()
         onClose()

         return data
      } catch (e) {
         const errorMessage = e.response?.data || t('toast.reset.error')
         showToast('error', errorMessage)
         return rejectWithValue(errorMessage)
      }
   },
)
