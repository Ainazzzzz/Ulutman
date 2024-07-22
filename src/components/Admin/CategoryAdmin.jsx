import React, { useMemo, useState } from 'react';
import Filter from '../../assets/icons/filter.svg?react';
import { linkClasses, Select, styled } from '@mui/material';
import Path from '../../assets/icons/path.svg?react';
import Table from '../UI/Table';
import { green, orange, red } from '@mui/material/colors';
import ReusableSelect from '../UI/Select';
import { Button } from '../UI/Button';
import Plus from '../../assets/icons/plus.svg?react';

const CategoryAdmin = () => {
   const [selectedValue, setSelectedValue] = useState('');
   const options = [
      { id: 1, value: 'option1', label: 'Option 1' },
      { id: 2, value: 'option2', label: 'Option 2' },
   ];
   const handleChange = event => {
      setSelectedValue(event.target.value);
   };
   const ads = [
      {
         id: 1,
         name: 'Jaka',
         title: 'квартира',
         description: 'Премиум класса 2х ком квартира',
         amount: '1111',
         status: 'Одобрен',
      },
      {
         id: 2,
         name: 'Jaka',
         title: 'квартира',
         description: 'Премиум класса 2х ком квартира',
         amount: '11',
         status: 'Отклонен',
      },
      {
         id: 3,
         name: 'Jaka',
         title: 'квартира',
         description: 'Премиум класса 2х ком квартира',
         amount: '1',
         status: 'Ожидает',
      },
   ];

   const headers = useMemo(
      () => [
         {
            Header: 'ИМЯ',
            accessor: 'name',
         },
         {
            Header: 'Название',
            accessor: 'title',
         },
         {
            Header: 'Описание',
            accessor: 'description',
         },
         {
            Header: 'Количество объявлений',
            accessor: 'amount',
         },

         {
            Header: 'СТАТУС',
            accessor: 'status',
            Cell: ({ cell: { value } }) => {
               let color, Icon;

               switch (value) {
                  case 'Одобрен':
                     color = green[500];
                     break;
                  case 'Отклонен':
                     color = red[500];
                     break;
                  case 'Ожидает':
                     color = orange[500];
                     // Icon = Wait;
                     break;
                  default:
                     color = 'inherit';
                     Icon = null;
               }

               return (
                  <div>
                     <div style={{ background: color }}>{value}</div>
                     {Icon && <Icon />}
                  </div>
               );
            },
         },
      ],
      [],
   );
   return (
      <WrapperContainer>
         <ButtonTitleStyle>
            <TitileFirst>Управление категориями и подкатегориями</TitileFirst>
            <ButtonStyle>
               <Plus />
               Добавить
            </ButtonStyle>
         </ButtonTitleStyle>

         <BoxContainerSort>
            <ContanerFilter>
               <FilterIcon>
                  <Filter />
               </FilterIcon>
               <TitleStyle>по названию</TitleStyle>
               <AmountStyle>
                  <TitleAmount> По количеству</TitleAmount>
                  <SelectStyle
                     options={options}
                     value={selectedValue}
                     onChange={handleChange}
                  />
               </AmountStyle>

               <StatusStyle>
                  <TitleAmount> Статус</TitleAmount>
                  <SelectStyle
                     options={options}
                     value={selectedValue}
                     onChange={handleChange}
                  />
               </StatusStyle>
               <PathFilter>
                  <Path />
                  <div>Сбросить фильтр</div>
               </PathFilter>
            </ContanerFilter>
         </BoxContainerSort>
         <TableContainer>
            <Table data={ads} column={headers} />
         </TableContainer>
      </WrapperContainer>
   );
};

export default CategoryAdmin;

const WrapperContainer = styled('div')(({ theme }) => ({
   fontSize: '14px',
   fontFamily: 'Nunito Sans',
   lineHeight: '19px',
   fontWeight: '700',
   [theme.breakpoints.down('md')]: {
      fontSize: '12px',
      lineHeight: '17px',
   },
}));
const ButtonTitleStyle = styled('div')(({ theme }) => ({
   display: 'flex',
   gap: '210px',
   [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      gap: '14px',
      paddingLeft: '16px',
      paddingBottom: '24px',
   },
}));
const ButtonStyle = styled(Button)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'center',
   gap: '4px',
   fontWeight: '500',
   textTransform: 'inherit',
   height: '36px',
   marginTop: '35px',
   [theme.breakpoints.down('md')]: {
      width: '380px',
      height: '36px',
      marginTop: '0',
   },
}));
const TitileFirst = styled('h1')(({ theme }) => ({
   fontSize: '40px',
   fontWeight: '600',
   fontFamily: 'Kanit',
   lineHeight: '50px',
   color: '#202224',
   padding: '25px 0 25px 25px',
   [theme.breakpoints.down('md')]: {
      fontSize: '30px',
      lineHeight: '30px',
      padding: '24px 16px 0px 16px',
   },
}));
const BoxContainerSort = styled('div')(({ theme }) => ({
   padding: '0 0 25px 25px',
   [theme.breakpoints.down('md')]: {
      overflow: 'auto',
      maxHeight: '100vh',
   },
}));
const ContanerFilter = styled('div')(({ theme }) => ({
   display: 'flex',
   width: '760px',
   height: '70px',
   background: ' #F9F9FB',
   border: '0.6px solid #D5D5D5',
   borderRadius: '10px',
   paddingBottom: '25px',
   [theme.breakpoints.down('md')]: {
      overflowY: 'auto',
      maxHeight: '100vh',
   },
}));
const FilterIcon = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   width: '70px',
   height: '70px',
   borderRight: '0.6px solid #D5D5D5',
}));
const TitleStyle = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   width: '150px',
   height: '70px',
   borderRight: '0.6px solid #D5D5D5',
}));
const AmountStyle = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   width: '200px',
   textOverflow: 'ellipsis',
   height: '70px',
   borderRight: '0.6px solid #D5D5D5',
}));
const TitleAmount = styled('p')(() => ({
   paddingLeft: '20px',
   whiteSpace: 'nowrap',
}));
const StatusStyle = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   width: '200px',
   height: '70px',
   borderRight: '0.6px solid #D5D5D5',
}));

const PathFilter = styled('div')(() => ({
   display: 'flex',
   gap: '10px',
   justifyContent: 'center',
   alignItems: 'center',
   width: '220px',
   height: '70px',
}));
const TableContainer = styled('div')(({ theme }) => ({
   width: '1100px',
   height: '225px',
   padding: '0 0 25px 25px',
   [theme.breakpoints.down('md')]: {
      overflowY: 'auto',
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
      border: 'none',
   },
   '&:hover .MuiOutlinedInput-notchedOutline': {
      border: 'none',
   },
   '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      border: 'none',
   },
   '.MuiSelect-select': {
      paddingTop: '23px',
      border: 'none',
   },
}));
