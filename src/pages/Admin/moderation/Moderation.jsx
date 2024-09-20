import { useEffect, useMemo, useReducer } from 'react';
import { styled } from '@mui/material';

import Table from '../../../components/UI/Table.jsx';
import { AdsDeleteModal } from '../ads/AdsDeleteModal.jsx';
import { WaitingModal } from '../ads/WaitingModal.jsx';
import {
   MODERATION_COLUMNS,
   MODERATION_DATA,
} from '../../../utils/constants/moderation.jsx';
import { AdminHeaderFilter } from '../../../components/Admin/AdminHeaderFilter.jsx';
import { getAdminTableHeaders } from '../category/AdminTableHeader.jsx';
import {
   getModerationComments,
   getModerationCommentsFilter,
} from '../../../redux/moderation/moderationThunk.js';
import { useDispatch, useSelector } from 'react-redux';

const inputData = [
   { id: 'user', value: 'По имени' },
   { id: 'content', value: 'Поиск по тексту' },
];

const selectsConfig = [
   { label: 'date', options: [{ id: 'e1', value: 'date', label: 'Дата' }] },
   {
      label: 'status',
      options: [
         { id: 'e3', value: '', label: 'Cтатус' },
         { id: 'e3', value: 'ОДОБРЕН', label: 'Одобрен' },
         { id: 'e3', value: 'ОТКЛОНЕН', label: 'Отклонен' },
         { id: 'e3', value: 'ОЖИДАЕТ', label: 'Ожидает' },
      ],
   },
];

const initialState = {
   deleteAllModal: false,
   waitingModal: false,
   inputValues: { user: '', content: '', createDate: [], status: '' },
   selectedValues: { date: 'date', status: '' },
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
            inputValues: { ...state.inputValues, createDate: action.payload },
         };
      case 'SET_SELECTED_VALUES':
         return {
            ...state,
            selectedValues: { ...state.selectedValues, ...action.payload },
         };
      case 'RESET_FILTER':
         return {
            ...state,
            inputValues: { user: '', content: '', createDate: [] },
            selectedValues: { date: 'date', status: '' },
         };
      default:
         return state;
   }
};

export const Moderation = () => {
   const appDispatch = useDispatch();
   const { comments } = useSelector(state => state.moderation);
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

   useEffect(() => {
      appDispatch(
         getModerationCommentsFilter({
            ...state.inputValues,
            ...state.selectedValues,
         }),
      );
   }, [state.inputValues, state.selectedValues]);

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

         <Table data={comments} column={headers} />

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
   fontSize: '2.125rem',
   color: '#202224',
   [theme.breakpoints.down('md')]: {
      fontSize: '1.375rem',
   },
}));

const Wrapper = styled('div')(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '1.5rem',
   padding: '1.875rem',
   [theme.breakpoints.down('md')]: {
      overflowX: 'scroll',
   },
}));
