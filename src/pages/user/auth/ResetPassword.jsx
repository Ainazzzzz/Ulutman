import React, { useState } from 'react'
import { styled } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import Modal from '../../../components/UI/Modal'
import CloseIcon from '../../../assets/icons/cross-icon.svg?react'
import Input from '../../../components/UI/Input'
import { Button } from '../../../components/UI/Button'
import Spinner from '../../../components/UI/Spinner'
import { resetPassword } from '../../../redux/auth/authThunk'
import { useTranslation } from 'react-i18next'

const ResetPassword = ({ open, onClose, toggleSignInModal }) => {
   const dispatch = useDispatch()
   const { isLoading } = useSelector(state => state.auth)
   const { t } = useTranslation()

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
      setError('')
   }

   const handleConfirmPasswordChange = e => {
      setConfirmPassword(e.target.value)
      setError('')
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

         dispatch(resetPassword({ formData, toggleSignInModal, onClose, t }))
         setError('')
      } else {
         setError(t('resetPassword.error'))
      }
   }

   return (
      <Modal open={open} handleClose={handleClose}>
         <IconStyle>
            <CloseIcon onClick={handleClose} />
         </IconStyle>
         <Form onSubmit={handleSubmit}>
            <h2>{t('resetPassword.title')}</h2>

            <Input
               label={t('resetPassword.label1')}
               placeholder={t('resetPassword.placeholder1')}
               value={code}
               onChange={handleCodeChange}
               id="code"
               type="number"
               required
            />

            <Input
               label={t('resetPassword.label2')}
               placeholder={t('resetPassword.placeholder2')}
               value={email}
               onChange={handleEmailChange}
               id="email"
               type="email"
               required
            />

            <Input
               label={t('resetPassword.label3')}
               placeholder={t('resetPassword.placeholder3')}
               value={password}
               onChange={handlePasswordChange}
               id="password"
               type="password"
               required
            />
            <div style={{ position: 'relative' }}>
               <Input
                  label={t('resetPassword.label4')}
                  placeholder={t('resetPassword.placeholder4')}
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  id="confirmPassword"
                  type="password"
                  required
               />

               {error && <ErrorText>{error}</ErrorText>}
            </div>

            {isLoading ? (
               <Button disabled={isLoading}>
                  <Spinner />
               </Button>
            ) : (
               <Button type="submit">{t('resetPassword.btn')}</Button>
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
   position: 'absolute',
}))
