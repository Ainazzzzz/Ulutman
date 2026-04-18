import { useDispatch, useSelector } from 'react-redux'
import Breadcrumbs from '../../components/UI/Breadcrumbs'
import { CardList } from '../../components/UI/card/CardList'
import { Container } from '../MainPage'
import { useTranslation } from 'react-i18next'
import {
   deleteFavoriteStatus,
   getMainAds,
   updateFavoriteStatus,
} from '../../redux/main/mainThunk'
import { useEffect } from 'react'

export const RecommendationPage = () => {
   const { publishes } = useSelector(state => state.main)
   const { t } = useTranslation()
   const dispatch = useDispatch()

   const path = [
      { title: t('user.recommendations.breadcrumbs.main'), url: '/' },
      { title: t('user.recommendations.title'), url: '/recommendations' },
   ]

   useEffect(() => {
      dispatch(getMainAds())
   }, [dispatch])

   const handleDeleteFavorite = id => {
      dispatch(deleteFavoriteStatus({ id, t }))
   }
   const handleAddFavorite = id => {
      dispatch(updateFavoriteStatus({ id, t }))
   }
   return (
      <Container>
         <Breadcrumbs path={path} />
         <CardList
            cards={publishes}
            onDeleteById={handleDeleteFavorite}
            onAddFavoriteById={handleAddFavorite}
         />
      </Container>
   )
}
