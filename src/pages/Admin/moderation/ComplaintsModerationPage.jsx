import { useCallback, useEffect, useMemo, useReducer } from 'react';
import { styled } from '@mui/material';
import { getAdminTableHeaders } from '../category/AdminTableHeader';
import { AdminHeaderFilter } from '../../../components/Admin/AdminHeaderFilter';
import Table from '../../../components/UI/Table';
import { AdsDeleteModal } from '../ads/AdsDeleteModal.jsx';
import { WaitingModal } from '../ads/WaitingModal.jsx';
import { useDispatch, useSelector } from 'react-redux';
import {
   complaintsThunks,
   deleteComplaints,
   getComplaintsFilter,
   getResetFilter,
} from '../../../redux/complaintsThunks.js';
import { CheckBox } from '../../../components/UI/Checkbox.jsx';
import {
   checkAllComplaints,
   checkCopmlaint,
} from '../../../redux/complaints.Slice.js';
import TableSkeleton from '../../../components/UI/TableSkeleton.jsx';
import { useDebounce } from '../../../hooks/useDebounce.js';

const inputData = [{ id: 'user', value: 'Пользователь' }];

const selectsConfig = [
   { label: 'date', options: [{ id: 'e1', value: 'date', label: 'Дата' }] },
   {
      label: 'complaints',
      options: [
         { id: 'e1', value: 'complaints', label: 'Тип жалобы' },
         { id: 'e2', value: 'СПАМ', label: 'Спам' },
         {
            id: 'e3',
            value: 'ЖАЛОБЫНАПУБЛИКАЦИИ',
            label: 'Жалобы на публикации',
         },
         { id: 'e4', value: 'МОШЕННИЧЕСТВО', label: 'Моженничество' },
         { id: 'e5', value: 'ДРУГОЕ', label: 'Другое' },
      ],
   },
   {
      label: 'status',
      options: [
         { id: 'e1', value: 'status', label: 'Cтатус' },
         { id: 'e2', value: 'РЕШЕНО', label: 'Решено' },
         { id: 'e3', value: 'ОТКЛОНЕН', label: 'Отклонен' },
         { id: 'e4', value: 'ОЖИДАЕТ', label: 'Ожидает' },
      ],
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

const ComplaintsModerationPage = () => {
   const [state, dispatchFunc] = useReducer(reducer, initialState);
   const dispatch = useDispatch();
   const { data, isLoading } = useSelector(state => state.complaints);

   const debouncedName = useDebounce(state.inputValues.user, 1000);

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
      const { date, user } = state.inputValues;
      const { complaints, status } = state.selectedValues;

      const filters = {};

      if (complaints !== 'complaints') {
         filters.complaintsTypes = [complaints];
      }

      if (status !== 'status') {
         filters.complaintStatuses = [status];
      }

      if (user !== '') {
         filters.names = debouncedName;
      }

      if (date.length) {
         const formattedDates = date.map(formatDate);
         filters.createDates = formattedDates;
      }

      dispatch(getComplaintsFilter(filters));
   }, [state.selectedValues, dispatch, debouncedName]);

   useEffect(() => {
      fetchUser();
   }, [fetchUser]);

   const MODERATION_COMPLAINTS = [
      {
         Header: ({ data }) => (
            <CheckBox
               onChange={e =>
                  dispatch(
                     checkAllComplaints({ checked: e.target.checked, data }),
                  )
               }
            />
         ),

         accessor: 'check',
         Cell: ({ row }) => (
            <CheckBox
               checked={row.original.checked || false}
               onChange={e =>
                  dispatch(
                     checkCopmlaint({
                        checked: e.target.checked,
                        data: row.original,
                     }),
                  )
               }
            />
         ),
      },

      {
         Header: 'ПОЛЬЗОВАТЕЛЬ',
         accessor: 'authResponse.name',
      },
      {
         Header: 'тип жалобы',
         accessor: 'complaintType',
      },
      {
         Header: 'ДАТА СОЗДАНИЕ',
         accessor: 'createDate',
      },
      {
         Header: 'СТАТУС',
         accessor: 'complaintStatus',
      },
   ];

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

   const handleDeleteComplaint = () => {
      const filteredComplaints = data.filter(
         complaint => complaint.checked && complaint.checked,
      );

      const complaintsIds = filteredComplaints.map(ads => ads.id);

      dispatch(deleteComplaints({ ids: complaintsIds, toggleModal }));
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

         {isLoading ? (
            <TableSkeleton />
         ) : (
            <Table data={Array.isArray(data) ? data : []} column={headers} />
         )}
         <AdsDeleteModal
            isOpen={state.deleteAllModal}
            onClose={() => toggleModal('deleteModal')}
            onDelete={handleDeleteComplaint}
         />

         <WaitingModal
            isOpen={state.waitingModal}
            onClose={() => toggleModal('waitingModal')}
         />
      </Wrapper>
   );
};

export default ComplaintsModerationPage;

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
