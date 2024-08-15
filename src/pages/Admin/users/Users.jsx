import React, { useMemo, useReducer, useCallback } from 'react';
import { styled } from '@mui/material';
import Plus from '../../../assets/icons/plus.svg?react';
import { useNavigate } from 'react-router-dom';
import Table from '../../../components/UI/Table.jsx';
import { getAdminTableHeaders } from '../category/AdminTableHeader.jsx';
import {
   USERS_COLUMNS,
   USERS_DATA,
} from '../../../utils/constants/moderation.js';
import { AdsDeleteModal } from '../ads/AdsDeleteModal.jsx';
import { AdminHeaderFilter } from '../../../components/Admin/AdminHeaderFilter.jsx';
import { WaitingModal } from '../ads/WaitingModal.jsx';
import { Button } from '../../../components/UI/Button.jsx';

const inputData = [{ id: 'name', value: 'По имени' }];

const selectsConfig = [
   { label: 'role', options: [{ id: 'e1', value: 'role', label: 'Роль' }] },
   { label: 'date', options: [{ id: 'e2', value: 'date', label: 'Дата' }] },
   {
      label: 'status',
      options: [{ id: 'e3', value: 'status', label: 'Cтатус' }],
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
   const [state, dispatch] = useReducer(reducer, initialState);
   const navigate = useNavigate();

   const toggleModal = useCallback(modalType => {
      dispatch({ type: 'TOGGLE_MODAL', payload: modalType });
   }, []);

   const setValues = useCallback((field, payload) => {
      dispatch({ type: 'SET_VALUES', field, payload });
   }, []);

   const headers = useMemo(
      () =>
         getAdminTableHeaders(() => toggleModal('waitingModal'), USERS_COLUMNS),
      [toggleModal],
   );

   return (
      <Wrapper>
         <WrapperTitle>
            <Description>Управление пользователями</Description>
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
            onResetFilter={() => dispatch({ type: 'RESET_FILTER' })}
            handleDateChange={label =>
               setValues('inputValues', { date: label })
            }
            value={state.inputValues}
         />
         <Table data={USERS_DATA} column={headers} />

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
   fontWeight: '600',
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
