import Breadcrumbs from './UI/Breadcrumbs';
import SearchInput from './UI/SearchInput';
import { styled, useMediaQuery } from '@mui/material';
import { CategoryTab } from '../components/User/CategoryTab';
import ChevronLeft from '../assets/icons/chevron-left.svg?react';
import { useEffect } from 'react';
import { categoriesThunks } from '../redux/categories/caregoriesThunks';
import { useDispatch } from 'react-redux';

export const Categories = () => {
   const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'));
   const dispatch = useDispatch();
   const breadcrumbs = [
      { url: '/', title: 'Главная ' },
      { url: '/Недвижимость', title: 'Недвижимость ' },
   ];

   useEffect(() => {
      dispatch(categoriesThunks('realEstate'));
   }, [dispatch]);

   return (
      <Wrapper>
         <Container>
            <Block>
               <FirstBlock>
                  <Breadcrumbs path={breadcrumbs} />
                  {!isMobile && (
                     <span>
                        <ChevronLeft /> Назад
                     </span>
                  )}
               </FirstBlock>
               <SearchInputStyle placeholder="Поиск по названию" />
            </Block>
            <>
               <CategoryTab />
            </>
         </Container>
      </Wrapper>
   );
};

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
   },
}));
const Container = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '40px',
}));
const Block = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '24px',
}));
const Wrapper = styled('div')(({ theme }) => ({
   padding: '40px 60px 60px 60px',
   [theme.breakpoints.down('md')]: {
      padding: '24px 16px 24px 16px',
   },
}));

const SearchInputStyle = styled(SearchInput)(() => ({
   height: '64px',
}));
