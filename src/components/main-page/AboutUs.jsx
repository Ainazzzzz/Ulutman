import React from 'react'
import { Box, Typography, styled } from '@mui/material'
import { useTranslation } from 'react-i18next'
import AboutUsImg from '../../assets/images/about-us.png'

const AboutUs = () => {
   const { t } = useTranslation()

   return (
      <Container>
         <Title>{t('user.home.about.title')}</Title>
         <SecondContainer>
            <div>
               <SecondTitle>Улутман | Ulutman</SecondTitle>
               <Description>{t('user.home.about.description1')}</Description>
               <Description>{t('user.home.about.description2')}</Description>
            </div>
            <Image src={AboutUsImg} alt="About Us" />
         </SecondContainer>
      </Container>
   )
}

export default AboutUs

const Container = styled(Box)(() => ({
   paddingTop: '60px',
}))

const Title = styled(Typography)(({ theme }) => ({
   fontWeight: 700,
   fontSize: '2.125rem',
   marginBottom: '-20px',

   [theme.breakpoints.down('md')]: {
      margin: '0',
      textAlign: 'center',
   },
}))

const SecondContainer = styled(Box)(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'space-between',
   gap: '1.25rem',

   [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
   },
}))

const SecondTitle = styled(Typography)(({ theme }) => ({
   fontWeight: 500,
   fontSize: '2.5rem',
   margin: '0 0 .625rem 0',

   [theme.breakpoints.down('md')]: {
      margin: '0',
      textAlign: 'center',
   },
}))

const Description = styled(Typography)(({ theme }) => ({
   fontWeight: 400,
   fontSize: '1.125rem',
   color: '#282828',
   margin: '0 0 .3125rem 0',
   maxWidth: '24.75rem',

   width: '100%',

   [theme.breakpoints.down('md')]: {
      maxWidth: '100%',
   },
}))

const Image = styled('img')(() => ({
   objectFit: 'cover',

   maxWidth: '53.75rem',
   maxHeight: '34.6875rem',

   minWidth: '21.875rem',

   height: '100%',
   width: '100%',
}))
