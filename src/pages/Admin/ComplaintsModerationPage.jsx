import { useMemo, useReducer } from 'react';
import { styled } from '@mui/material';
import { getAdminTableHeaders } from '../../components/Admin/AdminTableHeader';
import { AdminHeaderFilter } from '../../components/Admin/AdminHeaderFilter';
import Table from '../../components/UI/Table';
import { AdsDeleteModal } from '../../components/Admin/ads/AdsDeleteModal';
import { WaitingModal } from '../../components/Admin/ads/WaitingModal';
import {
   MODERATION_COMPLAINTS,
   MODERATION_COMPLAINTS_DATA,
} from '../../utils/constants/moderation';

const inputData = [{ id: 'user', value: 'Пользователь' }];

const selectsConfig = [
   { label: 'date', options: [{ id: 'e1', value: 'date', label: 'Дата' }] },
   {
      label: 'complaints',
      options: [{ id: 'e1', value: 'complaints', label: 'Тип жалобы' }],
   },
   {
      label: 'status',
      options: [{ id: 'e3', value: 'status', label: 'Cтатус' }],
   },
];

const initialState = {
   deleteAllModal: false,
   waitingModal: false,
   inputValues: { user: '', date: [] },
   selectedValues: { date: 'date', status: 'status', complaints: 'complaints' },
};

const reducer = (state, action) => {
   switch (action.type) {
      case 'TOGGLE_DELETE_MODAL':
         return { ...state, deleteAllModal: !state.deleteAllModal };
      case 'TOGGLE_WAITING_MODAL':
         return { ...state, waitingModal: !state.waitingModal };
      case 'SET_INPUT_VALUES':
      case 'SET_DATE_VALUES':
      case 'SET_SELECTED_VALUES':
         return { ...state, ...action.payload };
      case 'RESET_FILTER':
         return initialState;
      default:
         return state;
   }
};

export const ComplaintsModerationPage = () => {
   const [state, dispatch] = useReducer(reducer, initialState);

   const handleToggle = type => dispatch({ type });

   const handleInputChange = (index, value) => {
      dispatch({
         type: 'SET_INPUT_VALUES',
         payload: { inputValues: { [index]: value } },
      });
   };

   const handleSelectChange = (label, value) => {
      dispatch({
         type: 'SET_SELECTED_VALUES',
         payload: { selectedValues: { [label]: value } },
      });
   };

   const handleDateChange = date => {
      dispatch({ type: 'SET_DATE_VALUES', payload: { inputValues: { date } } });
   };

   const headers = useMemo(
      () =>
         getAdminTableHeaders(
            () => handleToggle('TOGGLE_WAITING_MODAL'),
            MODERATION_COMPLAINTS,
         ),
      [],
   );

   return (
      <Wrapper>
         <Description>Управление жалобами и нарушениями</Description>

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

         <Table data={MODERATION_COMPLAINTS_DATA} column={headers} />

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
