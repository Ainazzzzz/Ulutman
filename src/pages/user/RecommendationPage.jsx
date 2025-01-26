import { useSelector } from 'react-redux'
import Breadcrumbs from '../../components/UI/Breadcrumbs'
import { CardList } from '../../components/UI/Card/CardList'
import { Container } from '../MainPage'
import { useTranslation } from 'react-i18next'

export const RecommendationPage = () => {
   const { publishes } = useSelector(state => state.main)
   const { t } = useTranslation()

   const path = [
      { title: t('user.recommendations.breadcrumbs.main'), url: '/' },
      { title: t('user.recommendations.title'), url: '/recommendations' },
   ]

   return (
      <Container>
         <Breadcrumbs path={path} />
         <CardList cards={publishes} />
      </Container>
   )
}
