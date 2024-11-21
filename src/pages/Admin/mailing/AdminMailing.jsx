import { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import { styled } from '@mui/material';
import Wait from '../../../assets/icons/wait-icon.svg?react';
import { green, red, orange } from '@mui/material/colors';
import ReusableSelect from '../../../components/UI/Select.jsx';
import { AdsDeleteModal } from '../ads/AdsDeleteModal.jsx';
import { WaitingModal } from '../ads/WaitingModal.jsx';
import Table from '../../../components/UI/Table.jsx';
import { Button } from '../../../components/UI/Button.jsx';
import Plus from '../../../assets/icons/plus.svg?react';
import { useNavigate } from 'react-router-dom';
import { checkAllUsers, checkUser } from '../../../redux/users/usersSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { CheckBox } from '../../../components/UI/Checkbox.jsx';
import { AdminHeaderFilter } from '../../../components/Admin/AdminHeaderFilter.jsx';
import { useDebounce } from '../../../hooks/useDebounce.js';
import {
   filterMailing,
   getAllMailing,
} from '../../../redux/mailing/mailingThunk.js';
import TableSkeleton from '../../../components/UI/TableSkeleton.jsx';
import { getAdminTableHeaders } from '../category/AdminTableHeader.jsx';
import {
   checkAllMailing,
   checkMailing,
} from '../../../redux/mailing/mailingSlice.js';

const inputData = [{ id: 'name', value: 'По имени' }];
const selectsConfig = [
   {
      label: 'type',
      options: [
         { id: 'e1', value: 'type', label: 'Тип' },
         { id: 'e2', value: 'НОВОСТИ', label: 'Новости' },
         { id: 'e3', value: 'АКЦИИ', label: 'Акции' },
         { id: 'e4', value: 'ПОЗДРАВЛЕНИЯ', label: 'Поздравления' },
      ],
   },
   { label: 'date', options: [{ id: 'e2', value: 'date', label: 'Дата' }] },
   {
      label: 'status',
      options: [
         { id: 'e5', value: 'status', label: 'Cтатус' },
         { id: 'e6', value: 'ОШИБКА', label: 'Ошибка' },
         { id: 'e7', value: 'ОТПРАВЛЕНО', label: 'Отправлено' },
      ],
   },
];

const initialState = {
   deleteAllModal: false,
   waitingModal: false,
   inputValues: { name: '', date: [] },
   selectedValues: { type: 'type', date: 'date', status: 'status' },
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

const AdminMailing = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { mailing, isLoading } = useSelector(state => state.mailing);

   const [state, dispatchFunc] = useReducer(reducer, initialState);

   const [open, setOpen] = useState(false);
   const [isOpen, setIsOpen] = useState(false);

   const debouncedName = useDebounce(state.inputValues.name, 1500);

   const handleOpenWaitingModal = () => setIsOpen(true);
   const handleCloseWaitingModal = () => setIsOpen(true);

   const formatDate = date => {
      const [day, month, year] = date.split('.');

      const currentYear = new Date().getFullYear();
      const century = Math.floor(currentYear / 100) * 100;
      const formattedYear =
         year.length === 2 ? century + parseInt(year, 10) : year;

      return `${formattedYear}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
   };

   const fetchMailing = useCallback(() => {
      const { date } = state.inputValues;
      const { type, status } = state.selectedValues;

      const filters = {};
      if (type !== 'type') filters.type = type;
      if (status !== 'status') filters.statuses = status;

      if (date.length) {
         const formattedDates = date.map(formatDate);
         filters.createDates = formattedDates;
      }

      if (Object.keys(filters).length) {
         dispatch(filterMailing(filters));
      } else {
         dispatch(getAllMailing());
      }
   }, [state.inputValues, state.selectedValues, dispatch]);

   useEffect(() => {
      // if (debouncedName) {
      //    // dispatch(getUsersName(debouncedName));
      // } else {
      fetchMailing();
      // }
   }, [debouncedName, state.selectedValues, fetchMailing, dispatch]);

   const toggleModal = useCallback(modalType => {
      dispatchFunc({ type: 'TOGGLE_MODAL', payload: modalType });
   }, []);

   const setValues = useCallback((field, payload) => {
      dispatchFunc({ type: 'SET_VALUES', field, payload });
   }, []);

   const resetFilterHandler = () => {
      dispatchFunc({ type: 'RESET_FILTER' });
      // dispatch(getResetFilter());
   };

   const MAILING_COLUMNS = [
      {
         Header: ({ data }) => (
            <CheckBox
               onChange={e =>
                  dispatch(checkAllMailing({ checked: e.target.checked, data }))
               }
            />
         ),

         accessor: 'check',
         Cell: ({ row }) => (
            <CheckBox
               checked={row.original.checked || false}
               onChange={e =>
                  dispatch(
                     checkMailing({
                        checked: e.target.checked,
                        data: row.original,
                     }),
                  )
               }
            />
         ),
      },
      {
         Header: 'Название',
         accessor: 'title',
      },
      {
         Header: 'тип',
         accessor: 'mailingType',
      },
      {
         Header: 'ДАТА РЕГИСТРАЦИИ',
         accessor: 'createDate',
      },

      {
         Header: 'СТАТУС',
         accessor: 'mailingStatus',
         Cell: ({ cell: { value } }) => {
            let color, Icon;

            switch (value) {
               case 'Отправлено':
                  color = green[500];
                  break;
               case 'Ошибка':
                  color = red[500];
                  break;
               case 'Ожидает':
                  color = orange[500];
                  Icon = Wait;
                  break;
               default:
                  color = 'inherit';
                  Icon = null;
            }

            return (
               <Block>
                  <MiniBlock
                     style={{ background: color, cursor: 'pointer' }}
                     onClick={
                        value === 'Ожидает' ? handleOpenWaitingModal : undefined
                     }
                  >
                     {value}
                  </MiniBlock>
                  {Icon && <Icon />}
               </Block>
            );
         },
      },
   ];

   const headers = useMemo(
      () =>
         getAdminTableHeaders(
            () => toggleModal('waitingModal'),
            MAILING_COLUMNS,
         ),
      [toggleModal],
   );

   const handleNavigate = () => {
      navigate('/admin/users/add-mailing');
   };

   return (
      <Wrapper>
         <TitleButtun>
            <Description>Создание и отправка email - рассылок</Description>
            <ButtunStyle onClick={handleNavigate}>
               <Plus />
               Создать новую рассылку
            </ButtunStyle>
         </TitleButtun>
         <Container>
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

            {open && <AdsDeleteModal />}
         </Container>

         {isLoading ? (
            <TableSkeleton />
         ) : (
            <Table data={mailing} column={headers} />
         )}
         {isOpen && <WaitingModal onClose={handleCloseWaitingModal} />}
      </Wrapper>
   );
};

export default AdminMailing;

const Description = styled('h2')(({ theme }) => ({
   fontWeight: '600',
   fontSize: '34px',
   color: '#202224',
   [theme.breakpoints.down('md')]: {
      fontSize: '26px',
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
const TitleButtun = styled('div')(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-between',
   [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
   },
}));
const ButtunStyle = styled(Button)(({ theme }) => ({
   fontFamily: 'Inter',
   fontWeight: '500',

   [theme.breakpoints.down('md')]: {
      width: '343px',
      height: '36px',
   },
}));
const Block = styled('div')(() => ({
   display: 'flex',
   alignItems: 'center',
   gap: '6px',
}));
const MiniBlock = styled('div')(() => ({
   width: '108px',
   height: '29px',
   borderRadius: '4px',
   color: 'white',
   padding: '4px 20px 0px 20px',
   fontSize: '14px',
   fontWeight: '500',
}));
const Container = styled('div')(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'space-between',
   svg: {
      cursor: 'pointer',
   },
   [theme.breakpoints.down('md')]: {
      gap: '24px',
      alignItems: 'inherit',
   },
}));
const FirstBlock = styled('div')(() => ({
   display: 'flex',
   alignItems: 'center',

   div: {
      width: '200px',
      height: '70px',

      display: 'flex',
      gap: '8px',
      alignItems: 'center',
      justifyContent: 'center',
      p: {
         color: '#ea0234',
         fontWeight: '600',
         fontSize: '14px',
         cursor: 'pointer',
      },
   },
}));

const Title = styled('p')(() => ({
   width: '115px',
   height: '70px',
   borderTop: '0.6px solid #d5d5d5',
   borderBottom: '0.6px solid #d5d5d5',
   display: 'flex',
   gap: '8px',
   alignItems: 'center',
   justifyContent: 'center',
   fontSize: '14px',
   fontWeight: '700',
   cursor: ' pointer',
}));

const FilterStyle = styled('p')(() => ({
   width: '64px',
   height: '70px',
   display: 'flex',
   gap: '8px',
   alignItems: 'center',
   justifyContent: 'center',
   border: '0.6px solid #d5d5d5',
   borderTopLeftRadius: '14px',
   borderBottomLeftRadius: '14px',
   svg: {
      cursor: 'pointer',
   },
}));

const SelectStyle = styled(ReusableSelect)(() => ({
   marginBottom: '18px',
   color: '#202224',
   fontWeight: '700',
   fontSize: '14px',

   '.MuiSelect-icon': {
      top: '30px',
      right: '24px',
   },
   '.MuiOutlinedInput-notchedOutline': {
      borderRadius: '0px',
      height: '75px',
      borderRight: 'none',
   },
   '&:hover .MuiOutlinedInput-notchedOutline': {
      border: '1px solid #d5d5d5',
      borderRight: 'none',
   },
   '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      border: '1px solid #d5d5d5',
      borderRight: 'none',
   },
   '.MuiSelect-select': {
      paddingTop: '23px',
   },
}));

const SecondMiniBlock = styled('div')(() => ({
   width: '193px',
   height: '70px',
   border: '0.6px solid #d5d5d5',
   borderTopRightRadius: '14px',
   borderBottomRightRadius: '14px',
}));
