import { styled } from '@mui/material'
import Breadcrumbs from '../../components/UI/Breadcrumbs'
import { CreateAdForm } from '../../components/User/CreateAdForm'

export const CreateAdPage = () => {
   const { t } = useTranslation();

   const path = [
      { title: t('user.createAds.breadcrumbs.main'), url: '/' },
      {
         title: t('user.createAds.breadcrumbs.currentPage'),
         url: '/create-ad',
      },
   ];
   return (
      <Container>
         <Breadcrumbs path={path} />
         <h1>Новое объявление</h1>
         <CreateAdForm />
      </Container>
   )
}

const Container = styled('div')(() => ({
   padding: '24px 52px 52px',

   h1: {
      padding: '8px',
   },
}))
