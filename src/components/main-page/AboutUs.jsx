import React from 'react'
import { Box, Typography, styled } from '@mui/material'
import AboutUsImg from '../../assets/images/about-us.png'

const AboutUs = () => {
   return (
      <Container>
         <Title>О нас</Title>
         <SecondContainer>
            {/* <div> */}
            <div>
               <SecondTitle>ulutman.ru</SecondTitle>
               <Description>
                  Это идеальное место для тех, кто ищет проверенные объявления о
                  продаже и аренде жилья, загородной или коммерческой
                  недвижимости.
               </Description>
               <Description>
                  Мы предлагаем широкий выбор услуг и возможностей для
                  размещения рекламы. Наш сайт открыт для мигрантов из
                  Узбекистана, Киргизии и других стран, а также для
                  русскоязычного населения, ищущего аренду комнат и квартир, а
                  также другие необходимые сервисы.
               </Description>
            </div>
            {/* </div> */}
            <Image src={AboutUsImg} alt="About Us" />
         </SecondContainer>
      </Container>
   )
}

export default AboutUs

const Container = styled(Box)(({ theme }) => ({
   paddingTop: '60px',
   [theme.breakpoints.down('md')]: {
      padding: '0 1.25rem',
   },
}))

const Title = styled(Typography)(({ theme }) => ({
   fontWeight: 700,
   fontSize: '2.125rem',
   marginBottom: '-50px',

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
   minWidth: '24.375rem',

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
