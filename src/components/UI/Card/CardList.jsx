/* eslint-disable import/no-cycle */
// * eslint-disable import/no-cycle */
import { useState } from 'react'
import { Grid, styled, useMediaQuery } from '@mui/material'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { CardItem } from './CardItem'
import { SceletonCard } from './SceletonCard'
import { SignIn } from '../../../pages/user/auth/SignIn'
import { PATHS } from '../../../utils/constants/paths'
import SignUp from '../../../pages/user/auth/signUp'
import ForgotPassword from '../../../pages/user/auth/ForgotPassword'
import ResetPassword from '../../../pages/user/auth/ResetPassword'

export const CardList = ({
   cards,
   advertising,
   loading,
   onDeleteById,
   onAddFavoriteById,
}) => {
   const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'))
   const { isAuth } = useSelector(state => state.auth)
   const navigate = useNavigate()
   const { t } = useTranslation()
   const [openLogin, setOpenLogin] = useState({
      login: false,
      register: false,
      forgot: false,
      reset: false,
   })

   const updateFavoriteHandler = id => {
      if (isAuth) {
         onAddFavoriteById(id)
      } else {
         setOpenLogin({
            ...openLogin,
            login: true,
         })
      }
   }

   const deleteFavoriteHandler = id => {
      if (isAuth) {
         onDeleteById(id)
      } else {
         setOpenLogin({
            ...openLogin,
            login: false,
         })
      }
   }

   const handleCloseLogin = () => {
      setOpenLogin({
         ...openLogin,
         login: false,
      })
   }

   const handleNavigateDetail = id => {
      navigate(PATHS.USER.DETAILS.replace(':id', id))
   }

   const handleOpenSignUp = () => {
      setOpenLogin({
         login: false,
         forgot: false,
         reset: false,
         register: true,
      })
   }
   return (
      <StyledContainer>
         {loading ? (
            <SceletonCard />
         ) : (
            <CardListBox container spacing={2.5}>
               {cards?.map(card => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={card.id}>
                     <CardItem
                        {...card}
                        onNavigateDetail={handleNavigateDetail}
                        onUpdateFavorite={() => updateFavoriteHandler(card.id)}
                        onDeleteFavorite={() => deleteFavoriteHandler(card.id)}
                        t={t}
                     />
                  </Grid>
               ))}
            </CardListBox>
         )}
         {isMobile && advertising && (
            <WrapperAdvertising>
               {advertising?.map(image => (
                  <Advertising image={image} key={crypto.randomUUID()} />
               ))}
            </WrapperAdvertising>
         )}
         <SignIn
            open={openLogin?.login}
            openSignUp={handleOpenSignUp}
            onClose={handleCloseLogin}
            openForgotPassword={() =>
               setOpenLogin({
                  login: false,
                  register: false,
                  reset: false,
                  forgot: true,
               })
            }
         />
         <SignUp
            open={openLogin?.register}
            onClose={() =>
               setOpenLogin({
                  login: false,
                  register: false,
                  forgot: false,
                  reset: false,
               })
            }
            openSignIn={() =>
               setOpenLogin({
                  register: false,
                  forgot: false,
                  reset: false,
                  login: true,
               })
            }
         />
         <ForgotPassword
            open={openLogin?.forgot}
            onClose={() =>
               setOpenLogin({
                  login: false,
                  register: false,
                  forgot: false,
                  reset: false,
               })
            }
            toggleResetPasswordModal={() =>
               setOpenLogin({
                  login: false,
                  register: false,
                  forgot: false,
                  reset: false,
               })
            }
         />
         <ResetPassword
            open={openLogin?.reset}
            onClose={() =>
               setOpenLogin({
                  login: false,
                  register: false,
                  forgot: false,
                  reset: false,
               })
            }
            toggleSignInModal={() =>
               setOpenLogin({
                  login: false,
                  register: false,
                  forgot: false,
                  reset: false,
               })
            }
         />
      </StyledContainer>
   )
}

const StyledContainer = styled('div')(({ theme }) => ({
   padding: theme.breakpoints.down('md') ? '0' : '0 60px',
   gap: '10px',
   width: '100%',
}))

export const CardListBox = styled(Grid)({
   marginTop: '20px',
   width: '100%',

   '.MuiPaper-root': {
      maxWidth: '100%',

      '.MuiCardMedia-root': {
         height: '250px',
      },
   },
})

const WrapperAdvertising = styled('div')({
   display: 'flex',
   flexDirection: 'column',
   gap: '20px',
   marginTop: '40px',
})
