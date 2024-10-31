import { useMemo, useReducer, useCallback } from 'react';
import { styled } from '@mui/material';
import { getAdminTableHeaders } from '../category/AdminTableHeader.jsx';
import { AdminHeaderFilter } from '../../../components/Admin/AdminHeaderFilter';
import Table from '../../../components/UI/Table';
import { AdsDeleteModal } from '../ads/AdsDeleteModal.jsx';
import { WaitingModal } from '../ads/WaitingModal.jsx';
import {
   MODERATION_MEDIA,
   MODERATION_MEDIA_DATA,
} from '../../../utils/constants/moderation';

const inputData = [
   { id: 'user', value: 'Пользователь' },
   { id: 'nameFile', value: 'Название файла' },
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
   inputValues: { user: '', nameFile: '', date: [] },
   selectedValues: { date: 'date', status: 'status' },
};

const reducer = (state, action) => {
   switch (action.type) {
      case 'TOGGLE_DELETE_MODAL':
      case 'TOGGLE_WAITING_MODAL':
         return {
            ...state,
            [action.type === 'TOGGLE_DELETE_MODAL'
               ? 'deleteAllModal'
               : 'waitingModal']:
               !state[
                  action.type === 'TOGGLE_DELETE_MODAL'
                     ? 'deleteAllModal'
                     : 'waitingModal'
               ],
         };
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
      case 'SET_DATE_VALUES':
         return {
            ...state,
            inputValues: { ...state.inputValues, date: action.payload.date },
         };
      case 'RESET_FILTER':
         return initialState;
      default:
         return state;
   }
};

const MediaFilesModerationPage = () => {
   const [state, dispatch] = useReducer(reducer, initialState);

   const handleToggle = useCallback(type => dispatch({ type }), []);

   const handleInputChange = useCallback((index, value) => {
      dispatch({
         type: 'SET_INPUT_VALUES',
         payload: { [index]: value },
      });
   }, []);

   const handleSelectChange = useCallback((label, value) => {
      dispatch({
         type: 'SET_SELECTED_VALUES',
         payload: { [label]: value },
      });
   }, []);

   const handleDateChange = useCallback(date => {
      dispatch({ type: 'SET_DATE_VALUES', payload: { date } });
   }, []);

   const headers = useMemo(
      () =>
         getAdminTableHeaders(
            () => handleToggle('TOGGLE_WAITING_MODAL'),
            MODERATION_MEDIA,
         ),
      [handleToggle],
   );

   return (
      <Wrapper>
         <Description>Проверка изображений и медиафайлов</Description>

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

         <Table data={MODERATION_MEDIA_DATA} column={headers} />

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

export default MediaFilesModerationPage;

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
