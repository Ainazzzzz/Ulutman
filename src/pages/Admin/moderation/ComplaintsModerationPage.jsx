import { useCallback, useEffect, useMemo, useReducer } from 'react';
import { styled } from '@mui/material';
import { getAdminTableHeaders } from '../category/AdminTableHeader';
import { AdminHeaderFilter } from '../../../components/Admin/AdminHeaderFilter';
import Table from '../../../components/UI/Table';
import { AdsDeleteModal } from '../ads/AdsDeleteModal.jsx';
import { WaitingModal } from '../ads/WaitingModal.jsx';
import {
   MODERATION_COMPLAINTS,
   MODERATION_COMPLAINTS_DATA,
} from '../../../utils/constants/moderation';
import { useDispatch, useSelector } from 'react-redux';
import {
   complaintsThunks,
   getComplaintsFilter,
   getResetFilter,
} from '../../../redux/complaintsThunks.js';

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

export const ComplaintsModerationPage = () => {
   const [state, dispatchFunc] = useReducer(reducer, initialState);
   const dispatch = useDispatch();
   const data = useSelector(state => state.complaints.data);
   console.log(data);

   const toggleModal = useCallback(modalType => {
      dispatchFunc({ type: 'TOGGLE_MODAL', payload: modalType });
   }, []);

   const setValues = useCallback((field, payload) => {
      dispatchFunc({ type: 'SET_VALUES', field, payload });
   }, []);

   const formatDate = date => {
      const parts = date.split('.');
      if (parts.length !== 3) {
         throw new Error('Invalid date format. Expected DD.MM.YYYY');
      }

      const [day, month, year] = parts;

      const currentYear = new Date().getFullYear();
      const century = Math.floor(currentYear / 100) * 100;

      const formattedYear =
         year.length === 2 ? century + parseInt(year, 10) : year;

      return `${formattedYear}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
   };

   const fetchUser = useCallback(() => {
      const { date } = state.inputValues;
      const { complaints, status } = state.selectedValues;

      const filters = {};

      console.log('Selected values:', state.selectedValues);

      if (complaints !== 'complaints') {
         filters.complaintsTypes = [complaints];
      }

      if (status !== 'status') {
         filters.complaintStatuses = [status];
      }

      if (date.length) {
         const formattedDates = date.map(formatDate);
         filters.createDates = formattedDates;
      }

      console.log('Filters before dispatch:', filters);

      if (Object.keys(filters).length) {
         dispatch(getComplaintsFilter(filters));
      } else {
         dispatch(complaintsThunks());
      }
   }, [state.inputValues, state.selectedValues, dispatch]);

   useEffect(() => {
      fetchUser();
   }, [fetchUser]);

   const headers = useMemo(
      () =>
         getAdminTableHeaders(
            () => toggleModal('waitingModal'),
            MODERATION_COMPLAINTS,
         ),
      [toggleModal],
   );

   const resetFilterHandler = () => {
      dispatchFunc({ type: 'RESET_FILTER' });
      dispatch(getResetFilter());
   };

   return (
      <Wrapper>
         <Description>Управление жалобами и нарушениями</Description>

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

         <Table data={Array.isArray(data) ? data : []} column={headers} />
         <AdsDeleteModal
            isOpen={state.deleteAllModal}
            onClose={() => toggleModal('deleteModal')}
         />

         <WaitingModal
            isOpen={state.waitingModal}
            onClose={() => toggleModal('waitingModal')}
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
