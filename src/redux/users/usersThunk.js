import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../config/axiosInstance'

export const getAllUsers = createAsyncThunk('users/getAllUsers', async () => {
   try {
      const { data } = await axiosInstance.get('/manage/users/getAll')
      return data
   } catch (error) {
      return error.message
   }
})

export const getUsersName = createAsyncThunk(
   'users/getUsersName',
   async value => {
      try {
         const { data } = await axiosInstance.get('/manage/users/name/filter', {
            params: {
               name: value,
            },
         })

         return data
      } catch (error) {
         return error.message
      }
   },
)

export const getUsersFilter = createAsyncThunk(
   'users/getUsersFilter',
   async ({ roles, createDates, statuses, names }) => {
      try {
         const queryString = new URLSearchParams()

         if (roles) queryString.append('roles', roles)

         if (createDates && Array.isArray(createDates)) {
            createDates.forEach(date => {
               queryString.append('createDates', date)
            })
         }

         if (statuses) queryString.append('statuses', statuses)
         if (names) queryString.append('names', names)

         const { data } = await axiosInstance.get(
            `/manage/users/filter?${queryString.toString()}`,
         )

         return data
      } catch (error) {
         return error.message
      }
   },
)

export const getResetFilter = createAsyncThunk(
   'users/getResetFilter',
   async () => {
      try {
         const { data } = await axiosInstance.get('/manage/users/resetFilter')

         return data
      } catch (error) {
         return error.message
      }
   },
)

export const deleteUsers = createAsyncThunk(
   'users/delete',
   async ({ userIds, toggleModal }, { rejectWithValue, dispatch }) => {
      try {
         await axiosInstance.delete('/manage/users/delete/batch', {
            data: userIds,
         })

         toggleModal('deleteAllModal')

         return dispatch(getAllUsers())
      } catch (error) {
         return rejectWithValue(error)
      }
   },
)

export const blockUserRequest = createAsyncThunk(
   'user/block',
   async ({ userId, newStatus, onClose }, { rejectWithValue, dispatch }) => {
      try {
         await axiosInstance.put(`/manage/users/${userId}/status`, undefined, {
            params: {
               newStatus,
            },
         })

         onClose()

         return dispatch(getAllUsers())
      } catch (error) {
         return rejectWithValue(error)
      }
   },
)
