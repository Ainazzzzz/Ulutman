/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { styled, useMediaQuery } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
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
import NoData from '../../assets/icons/empty-data.svg?react'
import { Loading } from '../UI/Loading'

export const FeaturedAds = () => {
   const [isOpenModal, setIsOpenModal] = useState(false)
   const { t } = useTranslation()
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const { favoriteProducts, isLoading } = useSelector(
      state => state.favoriteProducts || [],
   )

   const publishResponseList = favoriteProducts?.publishResponseList || []

   const breadCrumbs = [
      { url: '/', title: t('user.favorite.breadcrumbs.main') },
      { url: 'featuredAds', title: t('user.favorite.breadcrumbs.currentPage') },
   ]

   const handleDeleteFavorite = () => {
      setIsOpenModal(!isOpenModal)
   }
   const onDelete = () => {
      dispatch(deleteAllFavorites({ t }))
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
         {isLoading && <Loading />}
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
                  <DeleteAll
                     onClick={
                        publishResponseList.length > 0
                           ? handleDeleteFavorite
                           : null
                     }
                     style={{
                        cursor:
                           publishResponseList.length > 0
                              ? 'pointer'
                              : 'not-allowed',
                        opacity: publishResponseList.length > 0 ? 1 : 0.5,
                     }}
                  >
                     <DeleteIcon />
                     <p
                        onClick={
                           publishResponseList.length > 0
                              ? handleDeleteFavorite
                              : null
                        }
                        style={{
                           cursor:
                              publishResponseList.length > 0
                                 ? 'pointer'
                                 : 'not-allowed',
                           opacity: publishResponseList.length > 0 ? 1 : 0.5,
                        }}
                     >
                        {t('user.favorite.delete')}
                     </p>
                  </DeleteAll>
               ) : (
                  <DeleteAll
                     onClick={
                        publishResponseList.length > 0
                           ? handleDeleteFavorite
                           : null
                     }
                     style={{
                        cursor:
                           publishResponseList.length > 0
                              ? 'pointer'
                              : 'not-allowed',
                        opacity: publishResponseList.length > 0 ? 1 : 0.5,
                     }}
                  >
                     <DeleteIcon />
                     <p
                        onClick={
                           publishResponseList.length > 0
                              ? handleDeleteFavorite
                              : null
                        }
                        style={{
                           cursor:
                              publishResponseList.length > 0
                                 ? 'pointer'
                                 : 'not-allowed',
                           opacity: publishResponseList.length > 0 ? 1 : 0.5,
                        }}
                     >
                        {t('user.favorite.delete')}
                     </p>
                  </DeleteAll>
               )}
               {isOpenModal && <DeleteFavoriteModal onDelete={onDelete} />}
            </SecondBlock>
         </Container>

         {publishResponseList.length === 0 ? (
            <NoDataContainer>
               <NoData />
            </NoDataContainer>
         ) : (
            <CardList cards={publishResponseList} onDeleteById={onDeleteById} />
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

const NoDataContainer = styled('div')(() => ({
   width: '100%',
   display: 'flex',
   justifyContent: 'center',

   svg: {
      width: '40%',
   },
}))
