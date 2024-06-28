import { styled } from '@mui/material';
import React from 'react';
import Calling from '../../assets/icons/calling.svg?react';

const Footer = () => {
   return (
      <WrapperDiv>
         <TitleUlutman>Ulutman</TitleUlutman>
         <ContainerCategory>
            <div>Работа</div>
            <div>Аренда</div>
            <div>Гостиница</div>
            <div>Недвижимость</div>
            <div>Услуги</div>
            <div>Авто</div>
            <div>Продам</div>
         </ContainerCategory>
         <NumberContainer>
            <div>
               <CallingIcon />
            </div>
            <NumverTitle>+7(903) 263 18 65</NumverTitle>
         </NumberContainer>
      </WrapperDiv>
   );
};

export default Footer;
const WrapperDiv = styled('footer')(({ theme }) => ({
   display: 'flex',

   justifyContent: 'space-around',
   alignItems: 'center',
   width: '100%',
   gap: '80px',
   height: '118px',
   flexWrap: 'wrap',

   cursor: 'pointer',
   [theme.breakpoints.down('md')]: {
      height: 'auto',
      gap: '40px',
      justifyContent: 'flex-start',
      paddingLeft: '10px',
   },
}));
const ContainerCategory = styled('div')(({ theme }) => ({
   display: 'flex',

   justifyContent: 'space-around',
   gap: '18px',
   color: 'rgb(40, 40, 40)',
   fontFamily: 'Inter',
   fontSize: '16px',
   fontWeight: '400',
   lineHeight: '19px',

   [theme.breakpoints.down('sm')]: {
      fontSize: '14px',
      gap: '10px',
      display: 'grid',
      gridTemplateColumns: ' 1fr 1fr ',
      columnGap: '160px',
   },
}));

const TitleUlutman = styled('p')(({ theme }) => ({
   display: 'flex',
   color: 'rgb(40, 40, 40)',
   fontFamily: 'Inter',
   fontSize: '22px',
   fontWeight: '600',
   lineHeight: '27px',
   textTransform: 'uppercase',
   maxWidth: '100%',
   [theme.breakpoints.down('md')]: {
      borderBottom: '1px solid  rgb(217, 217, 217)',
      minWidth: '100%',
      fontSize: '1.125rem',
      lineHeight: '23px',
      justifyContent: 'center',
      padding: '24px',
   },
}));
const NumberContainer = styled('div')(({ theme }) => ({
   display: 'flex',
   fontFamily: 'Inter',
   fontSize: '1.125rem',
   fontWeight: '400',
   lineHeight: '22px',
   gap: '8px',
   justifyContent: 'flex-start',
   alignItems: 'center',
   [theme.breakpoints.down('md')]: {
      gap: '4px',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
   },
}));
const NumverTitle = styled('div')(({ theme }) => ({
   fontFamily: 'Inter',
   fontSize: '1.125rem',
   fontWeight: '400',
   [theme.breakpoints.down('md')]: {
      fontSize: '1rem',
   },
}));
const CallingIcon = styled(Calling)(({ theme }) => ({
   width: '21px',
   height: '21px',
   [theme.breakpoints.down('md')]: {
      width: '1.125rem',
      height: '1.125rem',
   },
}));
