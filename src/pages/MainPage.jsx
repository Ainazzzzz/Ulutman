import { styled } from '@mui/material';
import { MainBanner } from '../components/main-page/MainBanner';
import AnnouncementsSorter from '../components/AnnouncementsSorter';
import AboutUs from '../components/main-page/AboutUs';
import { Button } from '../components/UI/Button';
import { CARDS, SORT_BY_CATEGROY_OPTIONS } from '../utils/constants';
import { CardList } from '../components/UI/Card/CardList';
import Slider from '../components/main-page/Slider';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMainAds, sortPublishesRequest } from '../redux/main/mainThunk';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const MainPage = () => {
   const { publishes, isLoading } = useSelector(state => state.main);
   const { t } = useTranslation();

   const [sortedAds, setSortedAds] = useState([])
   const dispatch = useDispatch()
   const navigate = useNavigate()

   useEffect(() => {
      dispatch(getMainAds())
   }, [dispatch])

   useEffect(() => {
      setSortedAds(publishes)
   }, [publishes])

   const seeMoreHandler = () => {
      navigate('/user/recommendations')
   }

   const handleSortChange = sortValue => {
      dispatch(sortPublishesRequest(sortValue));
   };
   const transformedSortCategory = SORT_BY_CATEGROY_OPTIONS.map(item => {
      return {
         ...item,
         label: t(`global.sortCategory.${item.value}`),
      };
   });

   return (
      <div>
         <MainBanner />
         <SliderBox>
            <Slider />
         </SliderBox>
         <Container>
            <Block>
               <Title>{t('user.home.publishes.title')}</Title>
               <AnnouncementsSorter
                  options={transformedSortCategory}
                  onSortChange={handleSortChange}
               />
            </Block>
            <CardList
               cards={sortedAds.slice(0, 8)}
               advertising={CARDS}
               loading={isLoading}
            />
            <Button variant="category-sort" onClick={seeMoreHandler}>
               {t('user.home.publishes.all-publishes-button')}
            </Button>
            <AboutUs />
         </Container>
      </div>
   )
}

const Title = styled('p')(({ theme }) => ({
   fontSize: '34px',
   fontWeight: '600',
   [theme.breakpoints.down('md')]: {
      fontSize: '24px',
   },
}))
const Block = styled('div')(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-between',
   [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      gap: '10px',
   },
}))
export const Container = styled('div')(({ theme }) => ({
   padding: '60px',
   display: 'flex',
   flexDirection: 'column',
   gap: '24px',
   [theme.breakpoints.down('md')]: {
      padding: '20px 16px 0px 16px',
   },
}))

const SliderBox = styled('div')(({ theme }) => ({
   margin: '-20px 0 0 0',
   [theme.breakpoints.down('md')]: {
      display: 'none',
   },
}))
