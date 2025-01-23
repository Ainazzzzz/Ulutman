import { useState } from 'react'
import { styled, Typography } from '@mui/material'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Modal from '../../../components/UI/Modal'
import Input from '../../../components/UI/Input'
import { Button } from '../../../components/UI/Button'
import { signIn } from '../../../redux/auth/authThunk'
import CloseIcon from '../../../assets/icons/cross-icon.svg?react'
import Spinner from '../../../components/UI/Spinner'
import GoogleAuth from './GoogleAuth'
import { useTranslation } from 'react-i18next'

export const SignIn = ({ open, onClose, openSignUp, openForgotPassword }) => {
   const dispatch = useDispatch()
   const { t } = useTranslation()
   const { isLoading } = useSelector(state => state.auth)

   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [emailError, setEmailError] = useState('')
   const [passwordError, setPasswordError] = useState('')

   const handleEmailChange = event => {
      setEmail(event.target.value)
   }

   const handlePasswordChange = event => {
      setPassword(event.target.value)
   }

   const handleSubmit = e => {
      e.preventDefault()

      let hasError = false

      if (!email) {
         setEmailError(t('signIn.emailRequired'))
         hasError = true
      } else {
         setEmailError('')
      }

      if (!password) {
         setPasswordError(t('signIn.passwordRequired'))
         hasError = true
      } else {
         setPasswordError('')
      }

      if (hasError) return

      const newData = {
         email,
         password,
      }

      dispatch(signIn({ userData: newData, onClose }))
   }

   return (
      <Modal open={open} onClose={onClose}>
         <IconStyle>
            <CloseIcon onClick={onClose} />
         </IconStyle>
         <Box onSubmit={handleSubmit}>
            <h2>{t('signIn.enter')}</h2>
            <div style={{ position: 'relative' }}>
               <Input
                  placeholder={t('signIn.email')}
                  value={email}
                  onChange={handleEmailChange}
                  id="email"
                  type="email"
               />
               {emailError && <ErrorText>{emailError}</ErrorText>}
            </div>
            <div style={{ position: 'relative' }}>
               <Input
                  placeholder={t('signIn.password')}
                  value={password}
                  onChange={handlePasswordChange}
                  id="pasword"
                  type="password"
               />
               {passwordError && <ErrorText>{passwordError}</ErrorText>}
            </div>

            {isLoading ? (
               <Button disabled={isLoading}>
                  <Spinner />
               </Button>
            ) : (
               <Button type="submit">{t('signIn.enter')}</Button>
            )}
            <div>
               <GoogleAuth onClose={onClose} />
               <NavLink
                  onClick={() => {
                     openForgotPassword()
                     onClose()
                  }}
               >
                  {t('signIn.forgot')}
               </NavLink>
            </div>
            <Typography align="center">
               {t('signIn.noAccount')}
               <NavLink
                  onClick={() => {
                     openSignUp()
                     onClose()
                  }}
               >
                  {t('signIn.create')}
               </NavLink>
            </Typography>
         </Box>
      </Modal>
   )
}

const Box = styled('form')(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '30px',
   h2: {
      textAlign: 'center',
      fontWeight: '600',
      fontSize: '26px',
      paddingTop: '50px',
      [theme.breakpoints.down('md')]: {
         fontSize: '24px',
      },
   },
}))
const IconStyle = styled('div')(() => ({
   svg: {
      position: 'absolute',
      top: '26px',
      right: '26px',
      cursor: 'pointer',
   },
}))
const ErrorText = styled('p')(() => ({
   color: 'red',
   fontSize: '12px',
   position: 'absolute',
}))
