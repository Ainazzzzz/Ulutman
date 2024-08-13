import { useMemo, useReducer } from 'react';
import { styled } from '@mui/material';

import Table from '../UI/Table';
import { AdsDeleteModal } from './ads/AdsDeleteModal';
import { WaitingModal } from './ads/WaitingModal';
import {
   MODERATION_COLUMNS,
   MODERATION_DATA,
} from '../../utils/constants/moderation';
import { AdminHeaderFilter } from './AdminHeaderFilter';
import { getAdminTableHeaders } from './AdminTableHeader';

const inputData = [
   { id: 'name', value: 'По имени' },
   { id: 'search', value: 'Поиск по тексту' },
];

const selectsConfig = [
   { label: 'date', options: [{ id: 'e1', value: 'date', label: 'Дата' }] },
   {
      label: 'status',
      options: [{ id: 'e3', value: 'status', label: 'Cтатус' }],
   },
];

const initialState = {
   deleteAllModal: false,
   waitingModal: false,
   inputValues: { name: '', search: '', date: [] },
   selectedValues: { date: 'date', status: 'status' },
};

const reducer = (state, action) => {
   switch (action.type) {
      case 'TOGGLE_DELETE_MODAL':
         return {
            ...state,
            deleteAllModal: !state.deleteAllModal,
         };
      case 'TOGGLE_WAITING_MODAL':
         return {
            ...state,
            waitingModal: !state.waitingModal,
         };
      case 'SET_INPUT_VALUES':
         return {
            ...state,
            inputValues: { ...state.inputValues, ...action.payload },
         };
      case 'SET_DATE_VALUES':
         return {
            ...state,
            inputValues: { ...state.inputValues, date: action.payload },
         };
      case 'SET_SELECTED_VALUES':
         return {
            ...state,
            selectedValues: { ...state.selectedValues, ...action.payload },
         };
      case 'RESET_FILTER':
         return {
            ...state,
            inputValues: { name: '', search: '', date: [] },
            selectedValues: { date: 'date', status: 'status' },
         };
      default:
         return state;
   }
};

export const Moderation = () => {
   const [state, dispatch] = useReducer(reducer, initialState);

   const handleToggle = type => dispatch({ type });

   const handleInputChange = (index, value) => {
      dispatch({
         type: 'SET_INPUT_VALUES',
         payload: { [index]: value },
      });
   };

   const handleSelectChange = (label, value) => {
      dispatch({
         type: 'SET_SELECTED_VALUES',
         payload: { [label]: value },
      });
   };

   const handleDateChange = date => {
      dispatch({ type: 'SET_DATE_VALUES', payload: date });
   };

   const headers = useMemo(
      () =>
         getAdminTableHeaders(
            () => handleToggle('TOGGLE_WAITING_MODAL'),
            MODERATION_COLUMNS,
         ),
      [],
   );

   return (
      <Wrapper>
         <Description>Модерация комментариев и сообщений</Description>

         <AdminHeaderFilter
            selectedValues={state.selectedValues}
            onSelectChange={handleSelectChange}
            inputData={inputData}
            selectsConfig={selectsConfig}
            onDeleteModal={() => handleToggle('TOGGLE_DELETE_MODAL')}
            handleChange={handleInputChange}
            onResetFilter={() => handleToggle('RESET_FILTER')}
            value={state.inputValues}
            handleDateChange={handleDateChange}
         />

         <Table data={MODERATION_DATA} column={headers} />

         <AdsDeleteModal
            isOpen={state.deleteAllModal}
            onClose={() => handleToggle('TOGGLE_DELETE_MODAL')}
         />

         <WaitingModal
            isOpen={state.waitingModal}
            onClose={() => handleToggle('TOGGLE_WAITING_MODAL')}
         />
      </Wrapper>
   );
};

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
