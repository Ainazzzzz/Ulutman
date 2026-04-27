/* eslint-disable react/no-unstable-nested-components */
import React, {
   useCallback,
   useEffect,
   useMemo,
   useReducer,
   useState,
} from 'react'
import { styled } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { AdminHeaderFilter } from '../../../components/Admin/AdminHeaderFilter'
import { getAdminTableHeaders } from '../category/AdminTableHeader'
import Table from '../../../components/UI/Table'
import { AdsDeleteModal } from './AdsDeleteModal'
import { WaitingModal } from './WaitingModal'
import {
   deleteAdminAds,
   getAdminAdds,
   getAdminFilter,
   getResetFilter,
} from '../../../redux/thunks/adminAddThunk'
import { useDebounce } from '../../../hooks/useDebance'
import { translateCategory } from '../../../utils/general/translate'
import TableSkeleton from '../../../components/UI/TableSkeleton'

const inputData = [{ id: 'name', value: 'По имени' }]

const selectsConfig = [
   {
      label: 'category',
      options: [
         { id: 'e1', value: 'category', label: 'Категория' },
         { id: 'e2', value: 'WORK', label: 'Работа' },
         { id: 'e3', value: 'RENT', label: 'Аренда' },
         { id: 'e4', value: 'SELL', label: 'Продажа' },
         { id: 'e5', value: 'HOTEL', label: 'Отель' },
         { id: 'e6', value: 'SERVICES', label: 'Услуги' },
         { id: 'e7', value: 'AUTO', label: 'Авто' },
         { id: 'e8', value: 'REAL_ESTATE', label: 'Недвижимость' },
      ],
   },
   {
      label: 'date',
      options: [{ id: 'q1', value: 'date', label: 'Дата' }],
   },
   {
      label: 'status',
      options: [
         { id: 'k1', value: 'status', label: 'Cтатус' },
         { id: 'k2', value: 'ОДОБРЕН', label: 'Одобрен' },
         { id: 'k3', value: 'ОТКЛОНЕН', label: 'Отклонен' },
         { id: 'k4', value: 'ОЖИДАЕТ', label: 'Ожидает ' },
      ],
   },
]

const initialState = {
   deleteAllModal: false,
   waitingModal: false,
   inputValues: { name: '', search: '', date: [] },
   selectedValues: { date: 'date', status: 'status', category: 'category' },
}

const reducer = (state, action) => {
   switch (action.type) {
      case 'TOGGLE_MODAL':
         return { ...state, [action.payload]: !state[action.payload] }
      case 'SET_VALUES':
         return {
            ...state,
            [action.field]: { ...state[action.field], ...action.payload },
         }
      case 'RESET_FILTER':
         return initialState
      default:
         return state
   }
}

const Ads = () => {
   const [state, dispatchFunc] = useReducer(reducer, initialState)
   const dispatch = useDispatch()
   const [selectedAdData, setSelectedAdData] = useState(null)
   const debouncedName = useDebounce(state.inputValues.name, 1500)

   const { adminAdds, isLoading } = useSelector(state => state.adminAdds)

   const formatDate = date => {
      const [day, month, year] = date.split('.')

      const currentYear = new Date().getFullYear()
      const century = Math.floor(currentYear / 100) * 100
      const formattedYear =
         year.length === 2 ? century + parseInt(year, 10) : year

      return `${formattedYear}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
   }

   const fetchUsers = useCallback(() => {
      const { date, name } = state.inputValues
      const { category, status } = state.selectedValues

      const filters = {}
      if (category !== 'category') filters.categories = category
      if (status !== 'status') filters.publishStatuses = status
      if (name !== '') filters.names = name

      if (date.length) {
         const formattedDates = date.map(formatDate)
         filters.createDates = formattedDates
      }

      if (Object.keys(filters).length) {
         dispatch(getAdminFilter(filters))
      } else {
         dispatch(getAdminAdds())
      }
   }, [state.inputValues, state.selectedValues, dispatch])

   useEffect(() => {
      // if (debouncedName) {
      //    dispatch(getName(debouncedName));
      // } else {
      fetchUsers()
      // }
   }, [debouncedName, fetchUsers, dispatch, state.inputValues])

   const toggleModal = useCallback(modalType => {
      dispatchFunc({ type: 'TOGGLE_MODAL', payload: modalType })
   }, [])
   const openWaitingModal = ad => {
      setSelectedAdData(ad) // сохраняем выбранное объявление
      toggleModal('waitingModal') // открываем модалку
   }

   const setValues = useCallback((field, payload) => {
      dispatchFunc({ type: 'SET_VALUES', field, payload })
   }, [])

   const resetFilterHandler = () => {
      dispatchFunc({ type: 'RESET_FILTER' })
      dispatch(getResetFilter())
   }

   const handleDeleteAds = () => {
      const filteredAds = adminAdds.filter(ads => ads.checked && ads.checked)

      const adsIds = filteredAds.map(ads => ads.id)

      dispatch(deleteAdminAds({ ids: adsIds, toggleModal }))
   }

   const ADS_COLUMNS = [
      // {
      //    Header: ({ data }) => (
      //       <CheckBox
      //          onChange={e =>
      //             dispatch(checkAllAds({ checked: e.target.checked, data }))
      //          }
      //       />
      //    ),

      //    accessor: 'check',
      //    Cell: ({ row }) => (
      //       <CheckBox
      //          checked={row.original.checked || false}
      //          onChange={e =>
      //             dispatch(
      //                checkAds({
      //                   checked: e.target.checked,
      //                   data: row.original,
      //                }),
      //             )
      //          }
      //       />
      //    ),
      // },
      {
         Header: 'ИМЯ',
         accessor: 'userName',
      },
      // {
      //    Header: 'номер карты',
      //    accessor: 'cardNumber',
      // },
      {
         Header: 'Категория',
         accessor: 'Currency',
         Cell: ({ row }) => <p>{translateCategory[row.original.category]}</p>,
      },
      {
         Header: 'ДАТА СОЗДАНИЯ',
         accessor: 'createDate',
      },
      {
         Header: 'СТАТУС',
         accessor: 'publishStatus',
      },
   ]

   const headers = useMemo(
      () => getAdminTableHeaders(openWaitingModal, ADS_COLUMNS, 'user'),
      [openWaitingModal],
   )

   return (
      <Wrapper>
         <Description>Управление объявлениями</Description>

         <AdminHeaderFilter
            selectedValues={state.selectedValues}
            onSelectChange={(label, value) =>
               setValues('selectedValues', { [label]: value })
            }
            inputData={inputData}
            selectsConfig={selectsConfig}
            onDeleteModal={() => toggleModal('deleteAllModal')}
            handleChange={(index, value) =>
               setValues('inputValues', { [index]: value })
            }
            onResetFilter={resetFilterHandler}
            handleDateChange={date => setValues('inputValues', { date })}
            value={state.inputValues}
         />

         {isLoading ? (
            <TableSkeleton />
         ) : (
            <Table data={adminAdds} column={headers} />
         )}

         <AdsDeleteModal
            isOpen={state.deleteAllModal}
            onClose={() => toggleModal('deleteAllModal')}
            onDelete={handleDeleteAds}
         />

         <WaitingModal
            isOpen={state.waitingModal}
            adData={selectedAdData}
            onClose={() => {
               toggleModal('waitingModal')
            }}
         />
      </Wrapper>
   )
}

export default Ads

const Description = styled('h2')(({ theme }) => ({
   fontWeight: 600,
   fontSize: '34px',
   color: '#202224',
   [theme.breakpoints.down('md')]: {
      fontSize: '22px',
   },
}))

const Wrapper = styled('div')(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '24px',
   padding: '30px',
   [theme.breakpoints.down('md')]: {
      overflowX: 'scroll',
   },
}))
