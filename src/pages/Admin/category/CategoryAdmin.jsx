import React, { useMemo, useReducer, useCallback, useEffect } from 'react';
import { styled } from '@mui/material';
import Table from '../../../components/UI/Table';
import { AdsDeleteModal } from '../ads/AdsDeleteModal.jsx';
import { WaitingModal } from '../ads/WaitingModal.jsx';
import { Button } from '../../../components/UI/Button';
import Plus from '../../../assets/icons/plus.svg?react';
import { getAdminTableHeaders } from './AdminTableHeader';
import { CATEGORY_DATA } from '../../../utils/constants/moderation.jsx';
import { AdminHeaderFilter } from '../../../components/Admin/AdminHeaderFilter';
import { CheckBox } from '../../../components/UI/Checkbox.jsx';
import { useDispatch, useSelector } from 'react-redux';
import {
   filterAdminCategories,
   getAdminCategories,
} from '../../../redux/categories/categoriesThunk.js';
import {
   checkAllCategories,
   checkCategory,
} from '../../../redux/categories/categoriesSlice.js';
import { useDebounce } from '../../../hooks/useDebounce.js';
import TableSkeleton from '../../../components/UI/TableSkeleton.jsx';

const inputData = [{ id: 'name', value: 'По названию' }];

const selectsConfig = [
   {
      label: 'counter',
      options: [
         { id: 'e1', value: 'counter', label: 'По количеству' },
         { id: 'e2', value: 'asc', label: 'По возрастани' },
         { id: 'e3', value: 'desc', label: 'По убыванию' },
      ],
   },
   {
      label: 'status',
      options: [
         { id: 'e3', value: 'status', label: 'Cтатус' },
         { id: 'e2', value: 'АКТИВНО', label: 'Активно' },
         { id: 'e1', value: 'НЕАКТИВНО', label: 'Неактивно' },
      ],
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
   const dispatch = useDispatch();
   const { categories, isLoading } = useSelector(state => state.categories);

   const [state, dispatchFunc] = useReducer(reducer, initialState);
   const debouncedName = useDebounce(state.inputValues.name, 1000);

   const toggleModal = useCallback(modalType => {
      dispatchFunc({ type: 'TOGGLE_MODAL', payload: modalType });
   }, []);

   const setValues = useCallback((field, payload) => {
      dispatchFunc({ type: 'SET_VALUES', field, payload });
   }, []);

   const CATEGORY_COLUMNS = [
      {
         Header: ({ data }) => (
            <CheckBox
               onChange={e =>
                  dispatch(
                     checkAllCategories({ checked: e.target.checked, data }),
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
                     checkCategory({
                        checked: e.target.checked,
                        data: row.original,
                     }),
                  )
               }
            />
         ),
      },
      {
         Header: 'ИМЯ',
         accessor: 'name',
      },
      {
         Header: 'Название',
         accessor: 'publishes[0].title',
      },
      {
         Header: 'Описание',
         accessor: 'publishes[0].description',
      },
      {
         Header: 'Количество объявлений',
         accessor: 'numberOfPublications',
      },
      {
         Header: 'СТАТУС',
         accessor: 'status',
      },
   ];

   const headers = useMemo(
      () =>
         getAdminTableHeaders(
            () => toggleModal('waitingModal'),
            CATEGORY_COLUMNS,
         ),
      [toggleModal],
   );

   const fetchUsers = useCallback(() => {
      const { counter, status } = state.selectedValues;
      const { name } = state.inputValues;

      const filters = {};
      if (counter !== 'counter') filters.counters = counter;
      if (status !== 'status') filters.categoryStatuses = status;
      if (name !== '') filters.names = debouncedName;

      if (Object.keys(filters).length) {
         dispatch(filterAdminCategories(filters));
      } else {
         dispatch(getAdminCategories());
      }
   }, [state.selectedValues, dispatch, debouncedName]);

   useEffect(() => {
      fetchUsers();
   }, [debouncedName, state.selectedValues]);

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
            onResetFilter={() => dispatchFunc({ type: 'RESET_FILTER' })}
            value={state.inputValues}
         />

         {isLoading ? (
            <TableSkeleton />
         ) : (
            <Table data={categories} column={headers} />
         )}

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
