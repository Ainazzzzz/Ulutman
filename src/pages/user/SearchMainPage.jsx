import { styled } from '@mui/material';
import Breadcrumbs from '../../components/UI/Breadcrumbs';

import { useDispatch, useSelector } from 'react-redux';
import { CategoryCard } from '../../components/UI/CategoryCard';
import { useMainCategoryParams } from '../../hooks/useSearchParams';
import { useEffect } from 'react';
import { searchCategoryAndMetroRequest } from '../../redux/main/mainThunk';
import { serializeToQueryParams } from '../../utils/general/serialize';

const CATEGORY_MAIN = {
   ['Работа']: 'WORK',
   ['Аренда']: 'RENT',
   ['Гостиница']: 'HOTEL',
   ['Услуги']: 'SERVICES',
   ['Недвижимость']: 'REAL_ESTATE',
   ['Авто']: 'AUTO',
   ['Продам']: 'SELL',
};

export const SearchMainPage = () => {
   const { searchPublishes } = useSelector(state => state.main);
   console.log(searchPublishes);

   const { category, search, metro } = useMainCategoryParams();

   const dispatch = useDispatch();

   const breadcrumbs = [
      { url: '/', title: 'Главная ' },
      { url: `/user/main.php`, title: category },
   ];

   useEffect(() => {
      const queryParams = serializeToQueryParams({
         titles: search,
         categories: CATEGORY_MAIN[category],
         metros: metro,
      });
      dispatch(searchCategoryAndMetroRequest(queryParams));
   }, []);

   return (
      <Wrapper>
         <Container>
            <Block>
               <FirstBlock>
                  <Breadcrumbs path={breadcrumbs} />
               </FirstBlock>
            </Block>
            {/* <CardList cards={publishes.publishes} advertising={CARDS} /> */}
            <CategoryCard categories={searchPublishes} />
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
