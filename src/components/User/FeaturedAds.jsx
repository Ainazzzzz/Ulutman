import { styled, useMediaQuery } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import Breadcrumbs from '../UI/Breadcrumbs'
import DeleteIcon from '../../assets/icons/delete.svg?react'
import ChevronLeft from '../../assets/icons/chevron-left.svg?react'
import { CardList } from '../UI/Card/CardList'
import {
   deleteAllFavorites,
   deleteFavoritesById,
   getAllFavorites,
} from '../../redux/users/favoriteThunk'
import { DeleteFavoriteModal } from './DeleteFavoriteModal'
import { useTranslation } from 'react-i18next'
import { NavLink, useNavigate } from 'react-router-dom'

export const FeaturedAds = () => {
   const [isOpenModal, setIsOpenModal] = useState(false)
   const { t } = useTranslation()
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const favorite = useSelector(
      state => state.favoriteProducts?.favoriteProducts || [],
   )
   const publishResponseList = favorite?.publishResponseList || []

   const breadCrumbs = [
      { url: '/', title: t('user.favorite.breadcrumbs.main') },
      { url: 'featuredAds', title: t('user.favorite.breadcrumbs.currentPage') },
   ]

   const handleDeleteFavorite = () => {
      setIsOpenModal(!isOpenModal)
   }
   const onDelete = () => {
      dispatch(deleteAllFavorites())
      setIsOpenModal(!isOpenModal)
   }
   const onDeleteById = id => {
      dispatch(deleteFavoritesById(id))
   }

   useEffect(() => {
      dispatch(getAllFavorites())
   }, [dispatch])

   const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'))

   return (
      <Wrapper>
         <Container>
            <FirstBlock>
               <Breadcrumbs path={breadCrumbs} />
               <span onClick={() => navigate('/')}>
                  <ChevronLeft /> {t('user.favorite.back')}
               </span>
            </FirstBlock>
            <SecondBlock>
               <h3>{t('user.favorite.title')}</h3>
               {isMobile ? (
                  <DeleteAll onClick={handleDeleteFavorite}>
                     <DeleteIcon />
                     <p onClick={handleDeleteFavorite}>
                        {t('user.favorite.delete')}
                     </p>
                  </DeleteAll>
               ) : (
                  <DeleteAll onClick={handleDeleteFavorite}>
                     <DeleteIcon />
                     <p onClick={handleDeleteFavorite}>
                        {t('user.favorite.delete')}
                     </p>
                  </DeleteAll>
               )}
               {isOpenModal && <DeleteFavoriteModal onDelete={onDelete} />}
            </SecondBlock>
         </Container>

         {publishResponseList.length === 0 ? (
            <NoFavoritesMessage>
               {t('user.favorite.favoriteMessage')}
            </NoFavoritesMessage>
         ) : (
            <CardList
               cards={publishResponseList}
               onDeleteById={onDeleteById}
               favorite={favorite}
            />
         )}
      </Wrapper>
   )
}

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
}))

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
}))
const Container = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '24px',
}))

const Wrapper = styled('div')(({ theme }) => ({
   padding: '40px 60px 60px 60px',
   [theme.breakpoints.down('md')]: {
      padding: '24px 16px 16px 16px',
   },
}))

const NoFavoritesMessage = styled('p')(() => ({
   margin: '30px 0',
}))
const DeleteAll = styled('div')(({ theme }) => ({
   padding: '0px 10px 0px 10px',
   marginTop: '8px',
   height: '36px',
   borderRadius: '10px',
   background: '#FF00001A',
   display: 'flex',
   gap: '4px',
   alignItems: 'center',
   justifyContent: 'center',
   [theme.breakpoints.down('md')]: {
      width: '343px',
   },
   p: {
      fontWeight: '500',
      color: '#FF0000',
      cursor: 'pointer',
   },
}))
