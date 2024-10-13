import Breadcrumbs from '../UI/Breadcrumbs';
import DeleteAll from '../../assets/icons/delete-all-icon.svg?react';
import DeleteMobile from '../../assets/icons/delete-mobile-icon.svg?react';
import ChevronLeft from '../../assets/icons/chevron-left.svg?react';
import { styled, useMediaQuery } from '@mui/material';
import { CardList } from '../UI/Card/CardList';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
   deleteAllFavorites,
   deleteFavoritesById,
   getAllFavorites,
} from '../../redux/users/favoriteThunk';
import { DeleteFavoriteModal } from './DeleteFavoriteModal';

export const FeaturedAds = () => {
   const [isOpenModal, setIsOpenModal] = useState(false);
   const dispatch = useDispatch();
   const favorite = useSelector(
      state => state.favoriteProducts?.favoriteProducts || [],
   );
   const publishResponseList = favorite?.publishResponseList || [];

   const breadCrumbs = [
      { url: '/', title: 'Главная' },
      { url: 'featuredAds', title: 'Избранные объявления' },
   ];

   const handleDeleteFavorite = () => {
      setIsOpenModal(!isOpenModal);
   };
   const onDelete = () => {
      dispatch(deleteAllFavorites());
      setIsOpenModal(!isOpenModal);
   };
   const onDeleteById = id => {
      dispatch(deleteFavoritesById(id));
      dispatch(getAllFavorites());
   };

   useEffect(() => {
      dispatch(getAllFavorites());
   }, [dispatch]);

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
               {isMobile ? (
                  <DeleteMobile onClick={handleDeleteFavorite} />
               ) : (
                  <DeleteAll onClick={handleDeleteFavorite} />
               )}
               {isOpenModal && <DeleteFavoriteModal onDelete={onDelete} />}
            </SecondBlock>
         </Container>
         <CardList cards={publishResponseList} onDeleteById={onDeleteById} />
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
