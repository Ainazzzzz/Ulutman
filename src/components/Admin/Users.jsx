import { green, red } from '@mui/material/colors';
import React, { useMemo, useState } from 'react';
import { styled } from '@mui/material';
import ReusableSelect from '../UI/Select';
import Filter from '../../assets/icons/filter-icon.svg?react';
import Replay from '../../assets/icons/replay-icon.svg?react';
import RedDeleteIcon from '../../assets/icons/red-delete-icon.svg?react';
import Table from '../UI/Table';
import { DatePicker } from '../UI/DatePicker.jsx';

const Users = () => {
   const [open, setOpen] = useState(false);
   const [isOpen, setIsOpen] = useState(false);
   const [selectedValue, setSelectedValue] = useState('Категория');

   const ads = [
      {
         id: 1,
         name: 'Jaka',
         email: 'jaka-imanaliev@mail.ru',
         category: 'Услуги',
         date: '19.01.2023',
         status: 'Заблокирован',
         role: 'Админ',
      },
      {
         id: 2,
         name: 'Jaka',
         email: 'jaka-imanaliev@mail.ru',
         category: 'Админ',
         date: '19.01.2023',
         status: 'Заблокирован',
         role: 'Админ',
      },
      {
         id: 3,
         name: 'Jaka',
         email: 'jaka-imanaliev@mail.ru',
         category: 'Админ',
         date: '19.01.2023',
         status: 'Активный',
         role: 'Админ',
      },
   ];

   const handleOpenDeleteModal = () => setOpen(true);
   const handleOpenWaitingModal = () => setIsOpen(true);
   const handleCloseWaitingModal = () => setIsOpen(true);

   const headers = useMemo(
      () => [
         {
            Header: 'ИМЯ',
            accessor: 'name',
         },
         {
            Header: 'ЭЛЕКТРОННЫЙ АДРЕС',
            accessor: 'email',
         },
         {
            Header: 'РОЛЬ',
            accessor: 'role',
         },
         {
            Header: 'ДАТА РЕГИСТРАЦИИ',
            accessor: 'date',
         },

         {
            Header: 'СТАТУС',
            accessor: 'status',
            Cell: ({ cell: { value } }) => {
               let color, Icon;

               switch (value) {
                  case 'Активный':
                     color = green[500];
                     break;
                  case 'Заблокирован':
                     color = red[500];
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
                           value === 'Ожидает'
                              ? handleOpenWaitingModal
                              : undefined
                        }
                     >
                        {value}
                     </MiniBlock>
                     {Icon && <Icon />}
                  </Block>
               );
            },
         },
      ],
      [],
   );

   const options = [
      { id: 1, value: 'option1', label: 'Option 1' },
      { id: 2, value: 'option2', label: 'Option 2' },
   ];

   return (
      <Wrapper>
         <Description>Управление пользователями</Description>
         <Container>
            <FirstBlock>
               <FilterStyle>
                  <Filter />
               </FilterStyle>

               <Title>По имени</Title>

               <SelectStyle
                  value={selectedValue}
                  options={options}
                  renderValue={value =>
                     value
                        ? 'Роль'
                        : options.find(option => option.value === value)?.label
                  }
               />

               <DatePicker />

               <SelectStyle
                  value={selectedValue}
                  options={options}
                  renderValue={value =>
                     value
                        ? 'Статус'
                        : options.find(option => option.value === value)?.label
                  }
               />
               <SecondMiniBlock>
                  <Replay />
                  <p>Сбросить фильтр</p>
               </SecondMiniBlock>
            </FirstBlock>
            <div>
               <RedDeleteIcon onClick={handleOpenDeleteModal} />
            </div>
            {open && <AdsDeleteModal />}
         </Container>
         <Table data={ads} column={headers} />
         {isOpen && <WaitingModal onClose={handleCloseWaitingModal} />}
      </Wrapper>
   );
};

export default Users;

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
