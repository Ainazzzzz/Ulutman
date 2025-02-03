import React, { useEffect, useMemo } from 'react'
import { styled } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import TableSkeleton from '../../../components/UI/TableSkeleton'
import Table from '../../../components/UI/Table'
import { getAdminTableHeaders } from '../category/AdminTableHeader'
import {
   getAdvertisingDeactive,
   postAdvertisingActivated,
} from '../../../redux/advertising/advertisingThunk'

const Advertising = () => {
   const dispatch = useDispatch()
   const { isDeactivatedLoading, deactivatedAdvertising } = useSelector(
      state => state.advertising,
   )

   const handleStatusChange = item => {
      dispatch(postAdvertisingActivated(item.id))
   }

   const MAILING_COLUMN = [
      {
         Header: 'id',
         accessor: 'id',
      },
      {
         Header: 'Название банка',
         accessor: 'bank',
      },

      {
         Header: 'Электронный адрес',
         accessor: 'userGmail',
      },
      // {
      //    Header: 'ДАТА создания',
      //    accessor: 'user.createDate',
      // },
      {
         Header: 'СТАТУС',
         accessor: 'active',
         Cell: ({ row }) => (
            <ButtunActive
               type="button"
               onClick={() => handleStatusChange(row.original)}
            >
               {row.original.active ? 'Деактивировать' : 'Активировать'}
            </ButtunActive>
         ),
      },
   ]

   useEffect(() => {
      dispatch(getAdvertisingDeactive())
   }, [])
   const toggleModal = () => {}

   const headers = useMemo(
      () =>
         getAdminTableHeaders(
            () => toggleModal('blockUser'),
            MAILING_COLUMN,
            'user',
         ),
      [toggleModal],
   )

   return (
      <Wrapper>
         <h1>Управление рекламой</h1>

         {isDeactivatedLoading ? (
            <TableSkeleton />
         ) : (
            <Table data={deactivatedAdvertising} column={headers} />
         )}
      </Wrapper>
   )
}

export default Advertising

const Wrapper = styled('div')(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '24px',
   padding: '30px',
   [theme.breakpoints.down('md')]: {
      overflowX: 'scroll',
   },
}))

const ButtunActive = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   background: '#7e52ff',
   cursor: 'pointer',
   color: 'white',
   width: '140px',
   height: '30px',
   borderRadius: '10px',
}))
