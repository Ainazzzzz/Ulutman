import React, { useMemo, useReducer, useCallback, useEffect } from 'react';
import { styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { useDebounce } from '../../../hooks/useDebounce';
import Table from '../../../components/UI/Table';
import { getAdminTableHeaders } from '../category/AdminTableHeader';
import { USERS_COLUMNS } from '../../../utils/constants/moderation';
import { AdsDeleteModal } from '../ads/AdsDeleteModal';
import { AdminHeaderFilter } from '../../../components/Admin/AdminHeaderFilter';
import { WaitingModal } from '../ads/WaitingModal';
import { Button } from '../../../components/UI/Button';

import Plus from '../../../assets/icons/plus.svg?react';

import {
   getAllUsers,
   getResetFilter,
   getUsersFilter,
   getUsersName,
} from '../../../redux/users/usersThunk';

const inputData = [{ id: 'name', value: 'По имени' }];
const selectsConfig = [
   {
      label: 'role',
      options: [
         { id: 'e1', value: 'role', label: 'Роль' },
         { id: 'e2', value: 'USER', label: 'Пользователь' },
         { id: 'e3', value: 'ADMIN', label: 'Админ' },
      ],
   },
   { label: 'date', options: [{ id: 'e2', value: 'date', label: 'Дата' }] },
   {
      label: 'status',
      options: [
         { id: 'e5', value: 'status', label: 'Cтатус' },
         { id: 'e6', value: 'АКТИВНЫЙ', label: 'АКТИВНЫЙ' },
         { id: 'e7', value: 'ЗАБЛОКИРОВАН', label: 'ЗАБЛОКИРОВАН' },
      ],
   },
];

const initialState = {
   deleteAllModal: false,
   waitingModal: false,
   inputValues: { name: '', date: [] },
   selectedValues: { role: 'role', date: 'date', status: 'status' },
};

const reducer = (state, action) => {
   switch (action.type) {
      case 'TOGGLE_MODAL':
         return { ...state, [action.payload]: !state[action.payload] };
      case 'SET_VALUES':
         return {
            ...state,
            [action.field]: { ...state[action.field], ...action.payload },
         };
      case 'RESET_FILTER':
         return initialState;
      default:
         return state;
   }
};

const Users = () => {
   const [state, dispatchFunc] = useReducer(reducer, initialState);
   const { allUsers } = useSelector(state => state.users);
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const debouncedName = useDebounce(state.inputValues.name, 1500);

   const formatDate = date => {
      const [day, month, year] = date.split('.');

      const currentYear = new Date().getFullYear();
      const century = Math.floor(currentYear / 100) * 100;
      const formattedYear =
         year.length === 2 ? century + parseInt(year, 10) : year;

      return `${formattedYear}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
   };

   const fetchUsers = useCallback(() => {
      const { date } = state.inputValues;
      const { role, status } = state.selectedValues;

      const filters = {};
      if (role !== 'role') filters.roles = role;
      if (status !== 'status') filters.statuses = status;

      if (date.length) {
         const formattedDates = date.map(formatDate);
         filters.createDates = formattedDates;
      }

      if (Object.keys(filters).length) {
         dispatch(getUsersFilter(filters));
      } else {
         dispatch(getAllUsers());
      }
   }, [state.inputValues, state.selectedValues, dispatch]);

   useEffect(() => {
      if (debouncedName) {
         dispatch(getUsersName(debouncedName));
      } else {
         fetchUsers();
      }
   }, [debouncedName, fetchUsers, dispatch]);

   const toggleModal = useCallback(modalType => {
      dispatchFunc({ type: 'TOGGLE_MODAL', payload: modalType });
   }, []);

   const setValues = useCallback((field, payload) => {
      dispatchFunc({ type: 'SET_VALUES', field, payload });
   }, []);

   const headers = useMemo(
      () =>
         getAdminTableHeaders(() => toggleModal('waitingModal'), USERS_COLUMNS),
      [toggleModal],
   );

   const resetFilterHandler = () => {
      dispatchFunc({ type: 'RESET_FILTER' });
      dispatch(getResetFilter());
   };

   return (
      <Wrapper>
         <WrapperTitle>
            <Description>Управление пользователем</Description>
            <Button onClick={() => navigate('/admin/add-administrator')}>
               <Plus /> Добавить администратора
            </Button>
         </WrapperTitle>
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
         <Table data={allUsers} column={headers} />
         <AdsDeleteModal
            isOpen={state.deleteAllModal}
            onClose={() => toggleModal('deleteAllModal')}
         />
         <WaitingModal
            isOpen={state.waitingModal}
            onClose={() => toggleModal('waitingModal')}
         />
      </Wrapper>
   );
};

export default Users;

const Description = styled('h2')(({ theme }) => ({
   fontWeight: 600,
   fontSize: '34px',
   color: '#202224',
   [theme.breakpoints.down('md')]: {
      fontSize: '22px',
   },
}));

const Wrapper = styled('div')(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '24px',
   padding: '30px',
   [theme.breakpoints.down('md')]: {
      overflowX: 'scroll',
   },
}));

const WrapperTitle = styled('div')(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-between',
   gap: '24px',
   padding: '30px',
   [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
   },
}));
