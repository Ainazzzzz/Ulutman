import { styled, useMediaQuery } from '@mui/material';
import ChevronLeft from '../../assets/icons/chevron-left.svg?react';
import DeleteAll from '../../assets/icons/delete-all-icon.svg?react';
import DeleteMobile from '../../assets/icons/delete-mobile-icon.svg?react';
import { MyAds } from './MyAds';
import TabsUi from '../UI/TabsUi';

export const Ads = () => {
   const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'));

   const firstTab = [
      { value: '1', label: 'Профиль' },
      { value: '2', label: 'Избранное' },
      { value: '3', label: 'Сообщения' },
      { value: '4', label: 'Мои объявления' },
   ];

   const secondTab = [
      { value: '1', label: 'Активно' },
      { value: '2', label: 'На модерации' },
      { value: '3', label: 'Деактивировано' },
      { value: '4', label: 'Отклонено' },
   ];

   return (
      <Wrapper>
         <Container>
            <Block>
               <TabsUi tabs={firstTab} />
               <NextStyle>
                  <ChevronLeft /> Назад
               </NextStyle>
            </Block>
            <Line></Line>
            <Block>
               <TabsUi tabs={secondTab} />

               {isMobile ? (
                  <DeleteMobile />
               ) : (
                  <DeleteAll style={{ marginTop: '10px' }} />
               )}
            </Block>
         </Container>

         <MyAds />
      </Wrapper>
   );
};
const NextStyle = styled('span')(({ theme }) => ({
   fontSize: '14px',
   fontWeight: '400',
   color: '#7e52ff',
   display: 'flex',
   gap: '4px',
   cursor: 'pointer',
   paddingTop: '20px',
   [theme.breakpoints.down('md')]: {
      paddingTop: '0px',
   },
}));

const Line = styled('div')(() => ({
   width: '100%',
   border: '1px solid #d9d9d9',
   //    padding: '20px',
}));

const Wrapper = styled('div')(({ theme }) => ({
   padding: '40px 60px',
   display: 'flex',
   flexDirection: 'column',
   gap: '40px',
   [theme.breakpoints.down('md')]: {
      padding: '24px 16px',
   },
}));
const Block = styled('div')(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-between',
   [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      gap: '30px',
   },
}));

const Container = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '24px',
}));
