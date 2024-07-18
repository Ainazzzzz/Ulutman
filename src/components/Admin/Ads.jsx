import React, { useMemo } from 'react';
import Table from '../UI/Table';
import { styled } from '@mui/material';
import Wait from '../../assets/icons/wait-icon.svg?react';
import { green, red, orange } from '@mui/material/colors';
import Filter from '../../assets/icons/filter-icon.svg?react';
export const Ads = () => {
   const ads = [
      {
         id: 1,
         name: 'Jaka',
         email: 'jaka-imanaliev@mail.ru',
         category: 'Услуги',
         date: '19.01.2023',
         status: 'Одобрен',
      },
      {
         id: 2,
         name: 'Jaka',
         email: 'jaka-imanaliev@mail.ru',
         category: 'Админ',
         date: '19.01.2023',
         status: 'Отклонен',
      },
      {
         id: 3,
         name: 'Jaka',
         email: 'jaka-imanaliev@mail.ru',
         category: 'Админ',
         date: '19.01.2023',
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
            Header: 'ЭЛЕКТРОННЫЙ АДРЕС',
            accessor: 'email',
         },
         {
            Header: 'КАТЕГОРИЯ',
            accessor: 'category',
         },
         {
            Header: 'ДАТА СОЗДАНИЯ',
            accessor: 'date',
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
                     Icon = Wait;
                     break;
                  default:
                     color = 'inherit';
                     Icon = null;
               }

               return (
                  <Block>
                     <MiniBlock style={{ background: color }}>
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
   return (
      <Wrapper>
         <Description>Управление объявлениями</Description>
         <div>
            <Filter />
            <p>По имени</p>
         </div>
         <Table data={ads} column={headers} />
      </Wrapper>
   );
};

const Description = styled('h2')(() => ({
   fontWeight: '600',
   fontSize: '34px',
   color: '#202224',
}));
const Wrapper = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '24px',
   padding: '30px',
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
