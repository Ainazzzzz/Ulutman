import React, { useState } from 'react'
import { styled } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import Modal from '../../../components/UI/Modal'
import CloseIcon from '../../../assets/icons/cross-icon.svg?react'
import Input from '../../../components/UI/Input'
import { Button } from '../../../components/UI/Button'
import Spinner from '../../../components/UI/Spinner'
import { resetPassword } from '../../../redux/auth/authThunk'

const ResetPassword = ({ open, onClose, toggleSignInModal }) => {
   const dispatch = useDispatch()
   const { isLoading } = useSelector(state => state.auth)

   const [code, setCode] = useState('')
   const [password, setPassword] = useState('')
   const [confirmPassword, setConfirmPassword] = useState('')
   const [email, setEmail] = useState('')
   const [error, setError] = useState('')

   const handleCodeChange = e => {
      setCode(e.target.value)
   }

   const handlePasswordChange = e => {
      setPassword(e.target.value)
   }

   const handleConfirmPasswordChange = e => {
      setConfirmPassword(e.target.value)
   }

   const handleEmailChange = e => {
      setEmail(e.target.value)
   }

   const handleClose = () => onClose()

   const handleSubmit = e => {
      e.preventDefault()

      if (password === confirmPassword) {
         const formData = {
            pinCode: code,
            newPassword: password,
            confirmPassword,
            email,
         }

         dispatch(resetPassword({ formData, toggleSignInModal, onClose }))
         setError('')
      } else {
         setError('Пароли должны совпадать')
      }
   }

   return (
      <Modal open={open} handleClose={handleClose}>
         <IconStyle>
            <CloseIcon onClick={handleClose} />
         </IconStyle>
         <Form onSubmit={handleSubmit}>
            <h2>Сброс пароля</h2>

            <Input
               label="Код"
               placeholder="Код"
               value={code}
               onChange={handleCodeChange}
               id="code"
               type="number"
               required
            />

            <Input
               label="Почта"
               placeholder="example@gmail.com"
               value={email}
               onChange={handleEmailChange}
               id="email"
               type="email"
               required
            />

            <Input
               label="Новый пароль"
               placeholder="Пароль"
               value={password}
               onChange={handlePasswordChange}
               id="password"
               type="password"
               required
            />

            <Input
               label="Подтвердите пароль"
               placeholder="Подтвердите пароль"
               value={confirmPassword}
               onChange={handleConfirmPasswordChange}
               id="confirmPassword"
               type="password"
               required
            />

            {error && <ErrorText>{error}</ErrorText>}

            {isLoading ? (
               <Button disabled={isLoading}>
                  <Spinner />
               </Button>
            ) : (
               <Button type="submit">Продолжить</Button>
            )}
         </Form>{' '}
      </Modal>
   )
}

export default ResetPassword

const Form = styled('form')(({ theme }) => ({
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

const ErrorText = styled('span')(() => ({
   color: '#f00',
}))
