import React, {
   useCallback,
   useEffect,
   useMemo,
   useReducer,
   useState,
} from 'react';
import { styled } from '@mui/material';
import { AdminHeaderFilter } from '../../../components/Admin/AdminHeaderFilter.jsx';
import { getAdminTableHeaders } from '../category/AdminTableHeader.jsx';
import Table from '../../../components/UI/Table.jsx';
import { AdsDeleteModal } from './AdsDeleteModal.jsx';
import { WaitingModal } from './WaitingModal.jsx';
import { ADS_COLUMNS } from '../../../utils/constants/moderation.js';
import { useDispatch, useSelector } from 'react-redux';
import {
   getAdminAdds,
   getAdminFilter,
   getName,
   getResetFilter,
} from '../../../redux/thunks/adminAddThunk.js';
import { useDebounce } from '../../../hooks/useDebance.js';

const inputData = [{ id: 'name', value: 'По имени' }];

const selectsConfig = [
   {
      label: 'category',
      options: [
         { id: 'e1', value: 'category', label: 'Категория' },
         { id: 'e2', value: 'Работа', label: 'Работа' },
         { id: 'e3', value: 'Продажа', label: 'Продажа' },
         { id: 'e4', value: 'Отель', label: 'Авто' },
      ],
   },
   {
      label: 'date',
      options: [{ id: 'q1', value: 'date', label: 'Дата' }],
   },
   {
      label: 'status',
      options: [
         { id: 'k1', value: 'status', label: 'Cтатус' },
         { id: 'k2', value: 'Одобрен', label: 'Одобрен' },
         { id: 'k3', value: 'Отклонен', label: 'Отклонен' },
         { id: 'k4', value: 'Ожидает', label: 'Ожидает ' },
      ],
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

export const Ads = () => {
   const [state, dispatchFunc] = useReducer(reducer, initialState);
   const dispatch = useDispatch();

   const debouncedName = useDebounce(state.inputValues.name, 1500);

   const ADS_DATA = useSelector(state => state.adminAdds.adminAdds);

   const formatDate = date => {
      const [day, month, year] = date.split('.');

      const currentYear = new Date().getFullYear();
      const century = Math.floor(currentYear / 100) * 100;
      const formattedYear =
         year.length === 2 ? century + parseInt(year, 10) : year;

      return `${formattedYear}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
   };

   const fetchUsers = useCallback(() => {
      const { date } = state.inputValues;
      const { category, status } = state.selectedValues;

      const filters = {};
      if (category !== 'category') filters.categories = category;
      if (status !== 'status') filters.publishStatuses = status;

      if (date.length) {
         const formattedDates = date.map(formatDate);
         filters.createDates = formattedDates;
      }

      if (Object.keys(filters).length) {
         dispatch(getAdminFilter(filters));
      } else {
         dispatch(getAdminAdds());
      }
   }, [state.inputValues, state.selectedValues, dispatch]);

   useEffect(() => {
      if (debouncedName) {
         dispatch(getName(debouncedName));
      } else {
         fetchUsers();
      }
   }, [debouncedName, fetchUsers, dispatch]);

   const toggleModal = useCallback(modalType => {
      dispatchFunc({ type: 'TOGGLE_MODAL', payload: modalType });
   }, []);

   const setValues = useCallback((field, payload) => {
      dispatchFunc({ type: 'SET_VALUES', field, payload });
   }, []);

   const headers = useMemo(
      () =>
         getAdminTableHeaders(() => toggleModal('waitingModal'), ADS_COLUMNS),
      [toggleModal],
   );

   const resetFilterHandler = () => {
      dispatchFunc({ type: 'RESET_FILTER' });
      dispatch(getResetFilter());
   };

   return (
      <Wrapper>
         <Description>Управление объявлениями</Description>

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

         <Table data={ADS_DATA} column={headers} />

         <AdsDeleteModal
            isOpen={state.deleteAllModal}
            onClose={() => toggleModal('deleteAllModal')}
         />

         <WaitingModal
            isOpen={state.waitingModal}
            onClose={() => {
               toggleModal('waitingModal');
            }}
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
