import React, { useEffect, useMemo } from 'react'
import { styled } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import TableSkeleton from '../../../components/UI/TableSkeleton'
import Table from '../../../components/UI/Table'
import { getAdminTableHeaders } from '../category/AdminTableHeader'
import { getAdvertising } from '../../../redux/advertising/advertisingThunk'

const Advertising = () => {
   const dispatch = useDispatch()
   const { isLoading, advertising } = useSelector(state => state.advertising)

   const MAILING_COLUMN = [
      {
         Header: 'ИМЯ',
         accessor: 'userName',
      },
      {
         Header: 'Электронный адрес',
         accessor: 'email',
      },
      {
         Header: 'категория',
         accessor: 'category',
      },
      {
         Header: 'ДАТА создание',
         accessor: 'createDate',
      },
      {
         Header: 'СТАТУС',
         accessor: 'status',
      },
   ]

   const toggleModal = () => {}

   const headers = useMemo(
      () =>
         getAdminTableHeaders(
            () => toggleModal('blockUser'),
            MAILING_COLUMN,
            'user',
            // setUserData,
         ),
      [toggleModal],
   )

   useEffect(() => {
      dispatch(getAdvertising())
   }, [])

   return (
      <Wrapper>
         <h1>Управление рекламой</h1>

         {isLoading ? (
            <TableSkeleton />
         ) : (
            <Table data={advertising} column={headers} />
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
