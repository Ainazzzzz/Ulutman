import React, { useEffect, useMemo } from 'react';
import TableSkeleton from '../../../components/UI/TableSkeleton';
import Table from '../../../components/UI/Table';
import { styled } from '@mui/material';
import { getAdminTableHeaders } from '../category/AdminTableHeader';
import { useDispatch, useSelector } from 'react-redux';
import { getAdversiting } from '../../../redux/advertising/advertisingThunk';

const Advertising = () => {
   const dispatch = useDispatch();
   const { isLoading, advertising } = useSelector(state => state.advertising);

   const data = [
      {
         userName: 'Aziat',
         email: 'abdimalikovaziat@gmail.com',
         category: 'Arenda',
         createDate: '20-12-2024',
         status: 'ОПЛАЧЕНО',
      },
   ];

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
   ];

   const toggleModal = () => {};

   const headers = useMemo(
      () =>
         getAdminTableHeaders(
            () => toggleModal('blockUser'),
            MAILING_COLUMN,
            'user',
            // setUserData,
         ),
      [toggleModal],
   );

   useEffect(() => {
      dispatch(getAdversiting());
   }, []);

   return (
      <Wrapper>
         <h1>Управление рекламой</h1>

         {isLoading ? (
            <TableSkeleton />
         ) : (
            <Table data={advertising} column={headers} />
         )}
      </Wrapper>
   );
};

export default Advertising;

const Wrapper = styled('div')(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '24px',
   padding: '30px',
   [theme.breakpoints.down('md')]: {
      overflowX: 'scroll',
   },
}));
