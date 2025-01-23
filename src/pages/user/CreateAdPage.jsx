import { styled } from '@mui/material'
import Breadcrumbs from '../../components/UI/Breadcrumbs'
// import { CreateAdForm } from '../../components/User/CreateAdForm'
import { useTranslation } from 'react-i18next'
import { CreateAdForm } from '../../components/User/create-ad/CreateAdForm'

export const CreateAdPage = () => {
   const { t } = useTranslation()

   const path = [
      { title: t('user.createAds.breadcrumbs.main'), url: '/' },
      {
         title: t('user.createAds.breadcrumbs.currentPage'),
         url: '/create-ad',
      },
   ]

   return (
      <Wrapper>
         <Breadcrumbs path={path} />
         <PageTitle>{t('user.createAds.title')}</PageTitle>
         <Container>
            <Title>{t('user.createAds.information.infoTitle1')}</Title>
            <List>
               <li>{t('user.createAds.information.infoList1')}</li>
               <li>{t('user.createAds.information.infoList2')}</li>
               <li>{t('user.createAds.information.infoList3')}</li>
            </List>
            <Paragraph>{t('user.createAds.information.infoList4')}</Paragraph>

            <Subtitle>{t('user.createAds.information.infoTitle2')}</Subtitle>
            <UnorderedList>
               <li>{t('user.createAds.information.infoList5')}</li>
               <li>{t('user.createAds.information.infoList6')}</li>
            </UnorderedList>

            <Paragraph>{t('user.createAds.information.infoList7')}</Paragraph>
            <Paragraph>{t('user.createAds.information.infoList8')}</Paragraph>
         </Container>
         <CreateAdForm />
      </Wrapper>
   )
}

const Wrapper = styled('div')(() => ({
   padding: '24px 52px 52px',
}))

const PageTitle = styled('h1')(() => ({
   padding: '8px',
   fontSize: '24px',
   fontWeight: '700',
   color: '#333',
}))

const Container = styled('div')(({ theme }) => ({
   padding: theme.spacing(3),
   [theme.breakpoints.down('md')]: {
      padding: '20px 0',
   },
}))

const sharedTextStyles = ({ theme }) => ({
   fontSize: '14px',
   fontWeight: '600',
   color: '#000000A3',
   marginBottom: theme.spacing(2),

   [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(1.5),
   },
})

const Title = styled('h2')(sharedTextStyles)

const Subtitle = styled('h3')(({ theme }) => ({
   ...sharedTextStyles({ theme }),
   marginTop: theme.spacing(3),
   [theme.breakpoints.down('md')]: {
      marginTop: theme.spacing(1.5),
   },
}))

const List = styled('ol')(({ theme }) => ({
   listStyleType: 'decimal',
   paddingLeft: theme.spacing(2),

   fontSize: '14px',
   '& li': {
      listStyle: 'decimal',

      marginBottom: theme.spacing(1),
      color: '#000000A3',
   },
}))

const UnorderedList = styled('ul')(({ theme }) => ({
   marginBottom: theme.spacing(2),
   paddingLeft: theme.spacing(2),
   fontSize: '14px',
   listStyle: 'disc',

   '& li': {
      listStyle: 'disc',

      marginBottom: theme.spacing(1),
      color: '#000000A3',
   },
}))

const Paragraph = styled('p')(({ theme }) => ({
   marginBottom: theme.spacing(2),
   fontSize: '14px',
   color: '#000000A3',
   [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(1),
   },
}))
