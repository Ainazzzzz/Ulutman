import { styled, useMediaQuery } from '@mui/material';
import ChevronLeft from '../../assets/icons/chevron-left.svg?react';
import DeleteAll from '../../assets/icons/delete-all-icon.svg?react';
import DeleteMobile from '../../assets/icons/delete-mobile-icon.svg?react';
import { MyAds } from './MyAds';

export const Ads = () => {
   const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'));

   return (
      <Wrapper>
         <Container>
            <Block>
               <p>таблица бар</p>
               <NextStyle>
                  <ChevronLeft /> Назад
               </NextStyle>
            </Block>
            <Line></Line>
            <Block>
               <p>экинчи таблица бар </p>

               {isMobile ? <DeleteMobile /> : <DeleteAll />}
            </Block>
         </Container>

         <MyAds />
      </Wrapper>
   );
};
const NextStyle = styled('span')(() => ({
   fontSize: '14px',
   fontWeight: '400',
   color: '#7e52ff',
   display: 'flex',
   alignItems: 'center',
   gap: '4px',
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
   //    alignItems: 'center',
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
