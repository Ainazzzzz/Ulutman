import { useMemo, useReducer } from 'react';
import { styled } from '@mui/material';

import { getAdminTableHeaders } from './AdminTableHeader';
import Table from '../UI/Table';
import { AdsDeleteModal } from './ads/AdsDeleteModal';
import { WaitingModal } from './ads/WaitingModal';
import {
   MODERATION_COLUMNS,
   MODERATION_DATA,
} from '../../utils/constants/moderation';
import { AdminHeaderFilter } from './AdminHeaderFilter';

const inputData = [
   {
      id: 'name',
      value: 'По имени',
   },
   {
      id: 'search',
      value: 'Поиск по тексту',
   },
];

const selectsConfig = [
   {
      label: 'data',
      options: [
         {
            id: 'e1',
            value: 'data',
            label: 'Дата',
         },
      ],
   },
   {
      label: 'status',
      options: [
         {
            id: 'e3',
            value: 'status',
            label: 'Cтатус',
         },
      ],
   },
];

const initialState = {
   deleteAllModal: false,
   waitingModal: false,

   inputValues: {
      name: '',
      search: '',
      data: null,
   },

   selectedValues: {
      data: 'data',
      status: 'status',
   },
};

const reducer = (state, action) => {
   switch (action.type) {
      case 'TOGGLE_DELETE_MODAL':
         return { ...state, deleteAllModal: !state.deleteAllModal };
      case 'TOGGLE_WAITING_MODAL':
         return { ...state, waitingModal: !state.waitingModal };
      case 'SET_INPUT_VALUES':
         return {
            ...state,
            inputValues: { ...state.inputValues, ...action.payload },
         };
      case 'SET_SELECTED_VALUES':
         return {
            ...state,
            selectedValues: { ...state.selectedValues, ...action.payload },
         };
      case 'RESET_FILTER':
         return {
            ...state,
            inputValues: {
               name: '',
               search: '',
            },
            selectedValues: {
               data: 'data',
               status: 'status',
            },
         };
      default:
         return state;
   }
};

export const Moderation = () => {
   const [state, dispatch] = useReducer(reducer, initialState);

   const handleDeleteModal = () => dispatch({ type: 'TOGGLE_DELETE_MODAL' });

   const handleOpenWaitingModal = () =>
      dispatch({ type: 'TOGGLE_WAITING_MODAL' });

   const handleResetFilter = () => dispatch({ type: 'RESET_FILTER' });

   const handleInputChange = (index, value) => {
      dispatch({ type: 'SET_INPUT_VALUES', payload: { [index]: value } });
   };

   const handleSelectChange = (label, value) => {
      dispatch({ type: 'SET_SELECTED_VALUES', payload: { [label]: value } });
   };

   const headers = useMemo(
      () => getAdminTableHeaders(handleOpenWaitingModal, MODERATION_COLUMNS),
      [handleOpenWaitingModal],
   );

   return (
      <Wrapper>
         <Description>Управление жалобами и нарушениями</Description>

         <AdminHeaderFilter
            selectedValues={state.selectedValues}
            onSelectChange={handleSelectChange}
            inputData={inputData}
            selectsConfig={selectsConfig}
            onDeleteModal={handleDeleteModal}
            handleChange={handleInputChange}
            onResetFilter={handleResetFilter}
            value={state.inputValues}
         />

         <Table data={MODERATION_DATA} column={headers} />

         <AdsDeleteModal
            open={state.deleteAllModal}
            handleCloseModal={handleDeleteModal}
         />

         <WaitingModal
            isOpen={state.waitingModal}
            handleCloseModal={handleOpenWaitingModal}
         />
      </Wrapper>
   );
};

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
