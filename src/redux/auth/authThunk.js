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
   async ({ userData, onClose }, { rejectedWithValue }) => {
      try {
         const { data } = await axiosInstance.post('auth/sign-in', userData)

         const updatedData = { ...data, role: data.roleName }

         localStorage.setItem('ULUTMAN', JSON.stringify(updatedData))

         showToast('success', 'Успешно')
         onClose()

         return updatedData
      } catch (e) {
         const errorMessage = e.response?.data || 'Неверные данные для входа'
         showToast('error', errorMessage)
         return rejectedWithValue(errorMessage)
      }
   },
)

export const signUp = createAsyncThunk(
   'auth/signUp',
   async ({ val, onClose }, { rejectedWithValue }) => {
      try {
         const { data } = await axiosInstance.post('auth/sign-up', val)

         localStorage.setItem('ULUTMAN', JSON.stringify(data))

         showToast('success', 'Успешно')
         onClose()

         return data
      } catch (e) {
         return rejectedWithValue(e)
      }
   },
)
