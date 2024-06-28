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
            <CallingIcon />
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
   [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      height: 'auto',
      gap: '40px',
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
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gridTemplateColumns: '1fr 1fr',
   },
}));

const TitleUlutman = styled('p')(({ theme }) => ({
   color: 'rgb(40, 40, 40)',
   fontFamily: 'Inter',
   fontSize: '22px',
   fontWeight: '600',
   lineHeight: '27px',
   textTransform: 'uppercase',
   [theme.breakpoints.down('sm')]: {
      borderBottom: '1px solid gray',
      fontSize: '18px',
      lineHeight: '23px',
   },
}));
const NumberContainer = styled('div')(({ theme }) => ({
   display: 'flex',
   gap: '8px',
   [theme.breakpoints.down('sm')]: {
      gap: '4px',
   },
}));
const NumverTitle = styled('div')(({ theme }) => ({
   fontFamily: 'Inter',
   fontSize: '18px',
   fontWeight: '400',
   [theme.breakpoints.down('sm')]: {
      fontSize: '16px',
   },
}));
const CallingIcon = styled(Calling)(({ theme }) => ({
   width: '21px',
   height: '21px',
   [theme.breakpoints.down('sm')]: {
      width: '18px',
      height: '18px',
   },
}));
