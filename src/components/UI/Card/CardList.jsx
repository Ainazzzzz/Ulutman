// * eslint-disable import/no-cycle */
import { useState } from 'react'
import { Grid, styled, useMediaQuery } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { CardItem } from './CardItem'
import { SceletonCard } from './SceletonCard'
import { Advertising } from './Advertising'
import { SignIn } from '../../../pages/user/auth/SignIn'
import { PATHS } from '../../../utils/constants/paths'
import {
   deleteFavoriteStatus,
   updateFavoriteStatus,
} from '../../../redux/main/mainThunk'
<<<<<<< HEAD
import { useTranslation } from 'react-i18next'
=======
import SignUp from '../../../pages/user/auth/signUp'
import ForgotPassword from '../../../pages/user/auth/ForgotPassword'
import ResetPassword from '../../../pages/user/auth/ResetPassword'
>>>>>>> 25e441e4d02f2a14bc6d097b57ad3ff382100103

export const CardList = ({ cards, advertising, loading }) => {
   const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'))
   const { isAuth } = useSelector(state => state.auth)
   const dispatch = useDispatch()
   const navigate = useNavigate()
<<<<<<< HEAD
   const { t } = useTranslation()
   const [openLogin, setOpenLogin] = useState(false)
=======
   const [openLogin, setOpenLogin] = useState({
      login: false,
      register: false,
      forgot: false,
      reset: false,
   })
   console.log(openLogin)
>>>>>>> 25e441e4d02f2a14bc6d097b57ad3ff382100103

   const updateFavoriteHandler = id => {
      if (isAuth) {
         dispatch(updateFavoriteStatus({ id, t }))
      } else {
         setOpenLogin({
            ...openLogin,
            login: true,
         })
      }
   }

   const deleteFavoriteHandler = id => {
      if (isAuth) {
         dispatch(deleteFavoriteStatus({ id, t }))
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
                  register: false,
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
                  forgot: false,
               })
            }
            toggleResetPasswordModal={() =>
               setOpenLogin({
                  login: false,
                  register: false,
                  forgot: false,
                  reset: false,
                  reset: true,
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
                  reset: false,
               })
            }
            toggleSignInModal={() =>
               setOpenLogin({
                  login: false,
                  register: false,
                  forgot: false,
                  reset: false,
                  login: true,
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
