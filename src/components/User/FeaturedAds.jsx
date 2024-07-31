import Breadcrumbs from '../UI/Breadcrumbs';
import DeleteAll from '../../assets/icons/delete-all-icon.svg?react';
import DeleteMobile from '../../assets/icons/delete-mobile-icon.svg?react';
import ChevronLeft from '../../assets/icons/chevron-left.svg?react';
import { styled, useMediaQuery } from '@mui/material';
import { CardList } from '../UI/Card/CardList';
import { CARDS_MAIN } from '../../utils/constants';
import { CategoryCard } from '../UI/CategoryCard';

export const FeaturedAds = () => {
   const breadCrumbs = [
      { url: '/', title: 'Главная' },
      { url: 'featuredAds', title: 'Избранные объявления' },
   ];

   const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'));
   return (
      <Wrapper>
         <Container>
            <FirstBlock>
               <Breadcrumbs path={breadCrumbs} />
               <span>
                  <ChevronLeft /> Назад
               </span>
            </FirstBlock>
            <SecondBlock>
               <h3>Избранные объявления</h3>
               {isMobile ? <DeleteMobile /> : <DeleteAll />}
            </SecondBlock>

            {isMobile ? <CategoryCard /> : <CardList cards={CARDS_MAIN} />}
         </Container>
      </Wrapper>
   );
};

const FirstBlock = styled('div')(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'space-between',
   span: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      color: '#7e52ff',
      fontSize: '14px',
      fontWeight: '400',
      cursor: 'pointer',
      [theme.breakpoints.down('md')]: {
         fontSize: '12px',
      },
   },
}));

const SecondBlock = styled('div')(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'space-between',
   h3: {
      fontSize: '34px',
      fontWeight: '600',
      color: '#282828',
      [theme.breakpoints.down('md')]: {
         fontSize: '24px',
      },
   },
   svg: {
      cursor: 'pointer',
   },
   [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      alignItems: 'start',
      gap: '24px',
   },
}));
const Container = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '24px',
}));

const Wrapper = styled('div')(({ theme }) => ({
   padding: '40px 60px 60px 60px',
   [theme.breakpoints.down('md')]: {
      padding: '24px 16px 16px 16px',
   },
}));
