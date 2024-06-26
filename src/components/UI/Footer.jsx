import { styled } from '@mui/material';
import React from 'react';

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
      </WrapperDiv>
   );
};

export default Footer;
const WrapperDiv = styled('footer')(() => ({
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   width: '100%',
   gap: '80px',
   height: '118px',
   background: 'rgb(218, 219, 224)',
   cursor: 'pointer',
}));
const ContainerCategory = styled('div')(() => ({
   display: 'flex',
   gap: '18px',
   color: 'rgb(40, 40, 40)',
   fontFamily: 'Inter',
   fontSize: '16px',
   fontWeight: '400',
   lineHeight: '19px',
}));
const TitleUlutman = styled('p')(() => ({
   color: 'rgb(40, 40, 40)',
   fontFamily: 'Inter',
   fontSize: '22px',
   fontWeight: '600',
   lineHeight: '27px',
   textTransform: 'uppercase',
}));
