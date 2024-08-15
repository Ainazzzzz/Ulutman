import React, { useMemo, useReducer, useCallback } from 'react';
import { styled } from '@mui/material';
import Table from '../../../components/UI/Table';
import { AdsDeleteModal } from '../ads/AdsDeleteModal.jsx';
import { WaitingModal } from '../ads/WaitingModal.jsx';
import { Button } from '../../../components/UI/Button';
import Plus from '../../../assets/icons/plus.svg?react';
import { getAdminTableHeaders } from './AdminTableHeader';
import {
   CATEGORY_COLUMNS,
   CATEGORY_DATA,
} from '../../../utils/constants/moderation';
import { AdminHeaderFilter } from '../../../components/Admin/AdminHeaderFilter';

const inputData = [{ id: 'name', value: 'По названию' }];

const selectsConfig = [
   {
      label: 'counter',
      options: [{ id: 'e1', value: 'counter', label: 'По количеству' }],
   },
   {
      label: 'status',
      options: [{ id: 'e3', value: 'status', label: 'Cтатус' }],
   },
];

const initialState = {
   deleteAllModal: false,
   waitingModal: false,
   inputValues: { name: '' },
   selectedValues: { counter: 'counter', status: 'status' },
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

const CategoryAdmin = () => {
   const [state, dispatch] = useReducer(reducer, initialState);

   const toggleModal = useCallback(modalType => {
      dispatch({ type: 'TOGGLE_MODAL', payload: modalType });
   }, []);

   const setValues = useCallback((field, payload) => {
      dispatch({ type: 'SET_VALUES', field, payload });
   }, []);

   const headers = useMemo(
      () =>
         getAdminTableHeaders(
            () => toggleModal('waitingModal'),
            CATEGORY_COLUMNS,
         ),
      [toggleModal],
   );

   return (
      <Wrapper>
         <TitleButton>
            <Description>Управление категориями и подкатегориями</Description>
            <ButtonStyle>
               <Plus />
               Добавить
            </ButtonStyle>
         </TitleButton>

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
            value={state.inputValues}
         />

         <Table data={CATEGORY_DATA} column={headers} />

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

export default CategoryAdmin;

const Description = styled('h2')(({ theme }) => ({
   fontWeight: '600',
   fontSize: '34px',
   color: '#202224',
   [theme.breakpoints.down('md')]: {
      fontSize: '22px',
      paddingBottom: '15px',
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

const TitleButton = styled('div')(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-between',
   fontFamily: 'Inter',
   fontWeight: '500',
   [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
   },
}));

const ButtonStyle = styled(Button)(({ theme }) => ({
   fontFamily: 'Inter',
   fontWeight: '500',
   borderRadius: '15px',
   [theme.breakpoints.down('md')]: {
      width: '345px',
   },
}));
