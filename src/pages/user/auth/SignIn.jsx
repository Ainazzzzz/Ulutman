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

export const SignIn = ({ open, onClose, openSignUp, openForgotPassword }) => {
   const dispatch = useDispatch()
   const { isLoading } = useSelector(state => state.auth)

   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [, setError] = useState('')

   const handleEmailChange = event => {
      setEmail(event.target.value)
      setError('')
   }

   const handlePasswordChange = event => {
      setPassword(event.target.value)
      setError('')
   }

   const handleSubmit = e => {
      e.preventDefault()

      if (!email || !password) {
         setError('Пожалуйста, заполните все поля.')
         return
      }

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
            <h2>Войти</h2>

            <Input
               placeholder="Введите email"
               value={email}
               onChange={handleEmailChange}
               id="email"
               type="email"
            />
            <div>
               <Input
                  placeholder="Введите пароль"
                  value={password}
                  onChange={handlePasswordChange}
                  id="pasword"
                  type="password"
               />
               <NavLink
                  onClick={() => {
                     openForgotPassword()
                     onClose()
                  }}
               >
                  Забыли пароль?
               </NavLink>
            </div>

            {isLoading ? (
               <Button disabled={isLoading}>
                  <Spinner />
               </Button>
            ) : (
               <Button type="submit">Войти</Button>
            )}
            <GoogleAuth onClose={onClose} />
            <Typography align="center">
               У вас нету аккаунта?{' '}
               <NavLink
                  onClick={() => {
                     openSignUp()
                     onClose()
                  }}
               >
                  Создайте её
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
