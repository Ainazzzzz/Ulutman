/* eslint-disable react/no-unstable-nested-components */
import { useCallback, useEffect, useMemo, useReducer } from 'react'
import { styled } from '@mui/material'

import { useDispatch, useSelector } from 'react-redux'
import Table from '../../../components/UI/Table'
import { AdsDeleteModal } from '../ads/AdsDeleteModal'
import { WaitingModal } from '../ads/WaitingModal'
import { AdminHeaderFilter } from '../../../components/admin/AdminHeaderFilter'
import { getAdminTableHeaders } from '../category/AdminTableHeader'
import {
   deleteComments,
   getModerationComments,
} from '../../../redux/moderation/moderationThunk'
import { CheckBox } from '../../../components/UI/Checkbox'
import {
   checkAllComments,
   checkComments,
} from '../../../redux/moderation/moderationSlice'
import { useDebounce } from '../../../hooks/useDebounce'
import TableSkeleton from '../../../components/UI/TableSkeleton'

const inputData = [
   { id: 'user', value: 'По имени' },
   { id: 'content', value: 'Поиск по тексту' },
]

const selectsConfig = [
   { label: 'date', options: [{ id: 'e1', value: 'date', label: 'Дата' }] },
   {
      label: 'status',
      options: [
         { id: 'e1', value: 'status', label: 'Cтатус' },
         { id: 'e2', value: 'ОДОБРЕН', label: 'Одобрен' },
         { id: 'e3', value: 'ОТКЛОНЕН', label: 'Отклонен' },
         { id: 'e4', value: 'ОЖИДАЕТ', label: 'Ожидает' },
      ],
   },
]

const initialState = {
   deleteAllModal: false,
   waitingModal: false,
   inputValues: { user: '', content: '', date: [], status: '' },
   selectedValues: { date: 'date', status: 'status' },
}

const reducer = (state, action) => {
   switch (action.type) {
      case 'TOGGLE_DELETE_MODAL':
         return {
            ...state,
            deleteAllModal: !state.deleteAllModal,
         }
      case 'TOGGLE_WAITING_MODAL':
         return {
            ...state,
            waitingModal: !state.waitingModal,
         }
      case 'SET_INPUT_VALUES':
         return {
            ...state,
            inputValues: { ...state.inputValues, ...action.payload },
         }
      case 'SET_DATE_VALUES':
         return {
            ...state,
            inputValues: { ...state.inputValues, date: action.payload },
         }
      case 'SET_SELECTED_VALUES':
         return {
            ...state,
            selectedValues: { ...state.selectedValues, ...action.payload },
         }
      case 'RESET_FILTER':
         return {
            ...state,
            inputValues: { user: '', content: '', date: [] },
            selectedValues: { date: 'date', status: 'status' },
         }
      default:
         return state
   }
}

export const Moderation = () => {
   const dispatch = useDispatch()
   const { comments, isLoading } = useSelector(state => state.moderation)

   const [state, appDispatch] = useReducer(reducer, initialState)
   const debouncedName = useDebounce(state.inputValues.user, 1000)
   const debouncedContent = useDebounce(state.inputValues.content, 1000)

   const toggleModal = type => appDispatch({ type })

   const handleInputChange = (index, value) => {
      appDispatch({
         type: 'SET_INPUT_VALUES',
         payload: { [index]: value },
      })
   }

   const handleSelectChange = (label, value) => {
      appDispatch({
         type: 'SET_SELECTED_VALUES',
         payload: { [label]: value },
      })
   }

   const handleDateChange = date => {
      appDispatch({ type: 'SET_DATE_VALUES', payload: date })
   }

   const MODERATION_COLUMNS = [
      {
         Header: ({ data }) => (
            <CheckBox
               onChange={e =>
                  appDispatch(
                     checkAllComments({ checked: e.target.checked, data }),
                  )
               }
            />
         ),

         accessor: 'check',
         Cell: ({ row }) => (
            <CheckBox
               checked={row.original.checked || false}
               onChange={e =>
                  appDispatch(
                     checkComments({
                        checked: e.target.checked,
                        data: row.original,
                     }),
                  )
               }
            />
         ),
      },

      {
         Header: 'ПОЛЬЗОВАТЕЛЬ',
         accessor: 'authResponse.name',
      },
      {
         Header: 'КОММЕНТАРИЙ',
         accessor: 'content',
      },
      {
         Header: 'ДАТА СОЗДАНИЕ',
         accessor: 'createDate',
      },
      {
         Header: 'СТАТУС',
         accessor: 'moderatorStatus',
      },
   ]

   const headers = useMemo(
      () =>
         getAdminTableHeaders(
            () => toggleModal('TOGGLE_WAITING_MODAL'),
            MODERATION_COLUMNS,
         ),
      [],
   )

   const handleDeleteComments = () => {
      const filteredComments = comments.filter(
         comment => comment.checked && comment.checked,
      )

      const commentsIds = filteredComments.map(ads => ads.id)

      dispatch(deleteComments({ ids: commentsIds, toggleModal }))
   }

   const formatDate = date => {
      const [day, month, year] = date.split('.')

      const currentYear = new Date().getFullYear()
      const century = Math.floor(currentYear / 100) * 100
      const formattedYear =
         year.length === 2 ? century + parseInt(year, 10) : year

      return `${formattedYear}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
   }

   const fetchUsers = useCallback(() => {
      const { date, content, user } = state.inputValues
      const { status } = state.selectedValues

      const filters = {}

      if (status !== 'status') {
         filters.moderatorStatuses = status
      }

      if (content !== '') {
         filters.content = debouncedContent
      }

      if (user !== '') {
         filters.names = debouncedName
      }

      if (date.length) {
         const formattedDates = date.map(formatDate)
         filters.createDate = formattedDates
      }

      dispatch(getModerationComments(filters))
   }, [state.selectedValues, debouncedContent, debouncedName, dispatch])

   useEffect(() => {
      // if (debouncedName) {
      //    dispatch(getCommentsWithName(debouncedName));
      // } else {
      fetchUsers()
      // }
   }, [dispatch, debouncedName, debouncedContent, fetchUsers])

   return (
      <Wrapper>
         <Description>Модерация комментариев и сообщений</Description>

         <AdminHeaderFilter
            selectedValues={state.selectedValues}
            onSelectChange={handleSelectChange}
            inputData={inputData}
            selectsConfig={selectsConfig}
            onDeleteModal={() => toggleModal('TOGGLE_DELETE_MODAL')}
            handleChange={handleInputChange}
            onResetFilter={() => toggleModal('RESET_FILTER')}
            value={state.inputValues}
            handleDateChange={handleDateChange}
         />

         {isLoading ? (
            <TableSkeleton />
         ) : (
            <Table data={comments} column={headers} />
         )}

         <AdsDeleteModal
            isOpen={state.deleteAllModal}
            onClose={() => toggleModal('TOGGLE_DELETE_MODAL')}
            onDelete={handleDeleteComments}
         />

         <WaitingModal
            isOpen={state.waitingModal}
            onClose={() => toggleModal('TOGGLE_WAITING_MODAL')}
         />
      </Wrapper>
   )
}

const Description = styled('h2')(({ theme }) => ({
   fontWeight: 600,
   fontSize: '2.125rem',
   color: '#202224',
   [theme.breakpoints.down('md')]: {
      fontSize: '1.375rem',
   },
}))

const Wrapper = styled('div')(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '1.5rem',
   padding: '1.875rem',
   [theme.breakpoints.down('md')]: {
      overflowX: 'scroll',
   },
}))
