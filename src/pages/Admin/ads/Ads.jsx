import React, { useEffect, useMemo, useReducer } from 'react';
import { styled } from '@mui/material';
import { AdminHeaderFilter } from '../../../components/Admin/AdminHeaderFilter.jsx';
import { getAdminTableHeaders } from '../category/AdminTableHeader.jsx';
import Table from '../../../components/UI/Table.jsx';
import { AdsDeleteModal } from './AdsDeleteModal.jsx';
import { WaitingModal } from './WaitingModal.jsx';
import { ADS_COLUMNS, ADS_DATA } from '../../../utils/constants/moderation.js';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminAdds } from '../../../redux/thunks/adminAddThunk.js';

const inputData = [{ id: 'name', value: 'По имени' }];

const selectsConfig = [
   {
      label: 'category',
      options: [{ id: 'e1', value: 'category', label: 'Категория' }],
   },
   {
      label: 'date',
      options: [{ id: 'e2', value: 'date', label: 'Дата' }],
   },
   {
      label: 'status',
      options: [{ id: 'e3', value: 'status', label: 'Cтатус' }],
   },
];

const initialState = {
   deleteAllModal: false,
   waitingModal: false,
   inputValues: { name: '', search: '', date: [] },
   selectedValues: { date: 'date', status: 'status', category: 'category' },
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
            inputValues: { name: '', date: [] },
            selectedValues: {
               date: 'date',
               status: 'status',
               category: 'category',
            },
         };
      default:
         return state;
   }
};

export const Ads = () => {
   const [state, dispatch] = useReducer(reducer, initialState);
   const deliver = useDispatch();
   const adminAdds = useSelector(state => state.adminAdds.adminAdds);
   console.log(adminAdds);

   const handleDeleteToggleModal = () =>
      dispatch({ type: 'TOGGLE_DELETE_MODAL' });
   const handleWaitingToggleModal = () =>
      dispatch({ type: 'TOGGLE_WAITING_MODAL' });

   const handleResetFilter = () => dispatch({ type: 'RESET_FILTER' });

   const handleInputChange = (index, value) => {
      dispatch({ type: 'SET_INPUT_VALUES', payload: { [index]: value } });
   };

   const handleSelectChange = (label, value) => {
      dispatch({ type: 'SET_SELECTED_VALUES', payload: { [label]: value } });
   };

   const handleDateChange = date => {
      dispatch({ type: 'SET_DATE_VALUES', payload: date });
   };

   const headers = useMemo(
      () => getAdminTableHeaders(handleWaitingToggleModal, ADS_COLUMNS),
      [handleWaitingToggleModal],
   );

   useEffect(() => {
      deliver(getAdminAdds());
   }, []);

   return (
      <Wrapper>
         <Description>Управление объявлениями</Description>

         <AdminHeaderFilter
            selectedValues={state.selectedValues}
            onSelectChange={handleSelectChange}
            inputData={inputData}
            selectsConfig={selectsConfig}
            onDeleteModal={handleDeleteToggleModal}
            handleChange={handleInputChange}
            onResetFilter={handleResetFilter}
            value={state.inputValues}
            handleDateChange={handleDateChange}
         />

         <Table data={ADS_DATA} column={headers} />

         <AdsDeleteModal
            isOpen={state.deleteAllModal}
            onClose={handleDeleteToggleModal}
         />

         <WaitingModal
            isOpen={state.waitingModal}
            onClose={handleWaitingToggleModal}
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
