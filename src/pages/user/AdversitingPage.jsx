import React from 'react';
import Breadcrumbs from '../../components/UI/Breadcrumbs';
import FileUpload from '../Admin/mailing/FileUpload';
import { Button } from '../../components/UI/Button';
import { styled } from '@mui/material';
import ChevronLeft from '../../assets/icons/chevron-left-violet-icon.svg?react';

const AdversitingPage = () => {
   const breadcrumbs = [
      { url: '/', title: 'Главная ' },
      { url: '/', title: 'Добавить рекламу' },
   ];
   return (
      <WrapperContainer>
         <FirstBlock>
            <Breadcrumbs path={breadcrumbs} />
            <span>
               <ChevronLeft /> Назад
            </span>
         </FirstBlock>
         <Titile>Добавить рекламу</Titile>
         <ContainerAddImage>
            <BoxSyleTitle>
               <PragrafTitile>Загрузите фото</PragrafTitile>
               <SizeStyle>(размер фото 246 на 564)</SizeStyle>
            </BoxSyleTitle>
            <FileUpload />
         </ContainerAddImage>
         <ContainerAddImageSehond>
            <BoxSyleTitle>
               <PragrafTitile>Загрузите фото</PragrafTitile>
               <SizeStyle>(размер фото 407 на 285)</SizeStyle>
            </BoxSyleTitle>
            <FileUpload />
         </ContainerAddImageSehond>
         <Button>Добавить</Button>
      </WrapperContainer>
   );
};

export default AdversitingPage;
const WrapperContainer = styled('div')(() => ({
   padding: '60px 0 0 60px',
}));
const Titile = styled('h1')(() => ({
   fontSize: '34px',
   fontWeight: '600',
   padding: '24px 0 24px  0px',
}));
const SizeStyle = styled('span')(() => ({
   color: 'red',
}));
const ContainerAddImage = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '8px',
}));
const ContainerAddImageSehond = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '8px',
   padding: '24px 0 40px 0',
}));
const PragrafTitile = styled('p')(() => ({
   fontSize: '18px',
   fontWeight: '600',
   lineHeight: '21.78px',
}));
const BoxSyleTitle = styled('div')(() => ({
   display: 'flex',
   gap: '10px',
}));
const FirstBlock = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   span: {
      fontSize: '14px',
      color: '#7252ff',
      fontWeight: '400',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      cursor: 'pointer',
   },
}));
