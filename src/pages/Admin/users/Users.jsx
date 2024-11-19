import React, {
   useMemo,
   useReducer,
   useCallback,
   useEffect,
   useState,
} from 'react';
import { styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { useDebounce } from '../../../hooks/useDebounce';
import Table from '../../../components/UI/Table';
import { getAdminTableHeaders } from '../category/AdminTableHeader';
import { AdsDeleteModal } from '../ads/AdsDeleteModal';
import { AdminHeaderFilter } from '../../../components/Admin/AdminHeaderFilter';
import { WaitingModal } from '../ads/WaitingModal';
import { Button } from '../../../components/UI/Button';

import Plus from '../../../assets/icons/plus.svg?react';

import {
   deleteUsers,
   getAllUsers,
   getResetFilter,
   getUsersFilter,
} from '../../../redux/users/usersThunk';
import { CheckBox } from '../../../components/UI/Checkbox';
import { checkAllUsers, checkUser } from '../../../redux/users/usersSlice';
import { useTranslation } from 'react-i18next';
import TableSkeleton from '../../../components/UI/TableSkeleton';
import BlockUserModal from './BlockUserModal';

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
   blockUser: false,
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
   const dispatch = useDispatch();
   const { allUsers, isLoading } = useSelector(state => state.users);
   const navigate = useNavigate();
   const { t } = useTranslation();

   const [userData, setUserData] = useState(null);

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
      const { date, name } = state.inputValues;
      const { role, status } = state.selectedValues;

      const filters = {};
      if (role !== 'role') filters.roles = role;
      if (status !== 'status') filters.statuses = status;
      if (name !== '') filters.names = debouncedName;

      if (date.length) {
         const formattedDates = date.map(formatDate);

         filters.createDates = formattedDates;
      }

      if (Object.keys(filters).length) {
         dispatch(getUsersFilter(filters));
      } else {
         dispatch(getAllUsers());
      }
   }, [debouncedName, state.selectedValues, dispatch]);

   useEffect(() => {
      fetchUsers();
   }, [debouncedName, fetchUsers, dispatch]);

   const toggleModal = useCallback(modalType => {
      dispatchFunc({ type: 'TOGGLE_MODAL', payload: modalType });
   }, []);

   const setValues = useCallback((field, payload) => {
      dispatchFunc({ type: 'SET_VALUES', field, payload });
   }, []);

   const resetFilterHandler = () => {
      dispatchFunc({ type: 'RESET_FILTER' });
      dispatch(getResetFilter());
   };

   const handleDeleteUser = () => {
      const filteredUsers = allUsers.filter(
         user => user.checked && user.checked,
      );

      const userIds = filteredUsers.map(user => user.id);

      dispatch(deleteUsers({ userIds, toggleModal }));
   };

   const USERS_COLUMNS = [
      {
         Header: ({ data }) => (
            <CheckBox
               onChange={e =>
                  dispatch(checkAllUsers({ checked: e.target.checked, data }))
               }
            />
         ),

         accessor: 'check',
         Cell: ({ row }) => (
            <CheckBox
               checked={row.original.checked || false}
               onChange={e =>
                  dispatch(
                     checkUser({
                        checked: e.target.checked,
                        data: row.original,
                     }),
                  )
               }
            />
         ),
      },
      {
         Header: t('admin.users.table.columns.name'),
         accessor: 'userName',
      },
      {
         Header: t('admin.users.table.columns.email'),
         accessor: 'email',
      },
      {
         Header: t('admin.users.table.columns.role'),
         accessor: 'role',
         Cell: ({ row }) => (
            <p>{t(`admin.users.table.roles.${row.original.role}`)}</p>
         ),
      },
      {
         Header: t('admin.users.table.columns.dateOfRegistration'),
         accessor: 'createDate',
      },
      {
         Header: t('admin.users.table.columns.status'),
         accessor: 'status',

         Cell: ({ row }) => (
            <span>
               {t(`admin.users.table.statuses.${row.original.status}`)}
            </span>
         ),
      },
   ];

   const headers = useMemo(
      () =>
         getAdminTableHeaders(
            () => toggleModal('blockUser'),
            USERS_COLUMNS,
            'user',
            setUserData,
         ),
      [toggleModal],
   );

   return (
      <Wrapper>
         <WrapperTitle>
            <Description>{t('admin.users.title')}</Description>
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
         {isLoading ? (
            <TableSkeleton />
         ) : (
            <Table data={allUsers} column={headers} />
         )}
         <AdsDeleteModal
            isOpen={state.deleteAllModal}
            onClose={() => toggleModal('deleteAllModal')}
            onDelete={handleDeleteUser}
         />
         <BlockUserModal
            isOpen={state.blockUser}
            onClose={() => toggleModal('blockUser')}
            userData={userData}
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
