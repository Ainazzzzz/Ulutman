import React, { useState } from 'react'
import { styled } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import Modal from '../../../components/UI/Modal'
import CloseIcon from '../../../assets/icons/cross-icon.svg?react'
import Input from '../../../components/UI/Input'
import Spinner from '../../../components/UI/Spinner'
import { Button } from '../../../components/UI/Button'
import { forgotPassword } from '../../../redux/auth/authThunk'
import { useTranslation } from 'react-i18next'

const ForgotPassword = ({ open, onClose, toggleResetPasswordModal }) => {
   const dispatch = useDispatch()
   const { isLoading } = useSelector(state => state.auth)
   const { t } = useTranslation()

   const [email, setEmail] = useState('')
   const [emailError, setEmailError] = useState('')

   const handleEmailChange = e => {
      setEmail(e.target.value)
      setEmailError('')
   }

   const handleSubmit = e => {
      e.preventDefault()

      let hasError = false

      if (!email) {
         setEmailError(t('forgotPassword.error'))
         hasError = true
      } else {
         setEmailError('')
      }
      if (hasError) return

      dispatch(
         forgotPassword({
            email,
            toggleResetPasswordModal,
            onClose,
         }),
      )
   }

   return (
      <Modal open={open} handleClose={onClose}>
         <IconStyle>
            <CloseIcon onClick={onClose} />
         </IconStyle>
         <Form onSubmit={handleSubmit}>
            <h2>{t('forgotPassword.title')}</h2>
            <div>
               <Input
                  placeholder={t('forgotPassword.placeholder')}
                  label={t('forgotPassword.label')}
                  value={email}
                  onChange={handleEmailChange}
                  id="email"
                  type="email"
                  required
               />
               {emailError && <ErrorText>{emailError}</ErrorText>}
            </div>
            {isLoading ? (
               <Button disabled={isLoading}>
                  <Spinner />
               </Button>
            ) : (
               <Button type="submit">{t('forgotPassword.btn')}</Button>
            )}
         </Form>
      </Modal>
   )
}

export default ForgotPassword

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
const ErrorText = styled('p')(() => ({
   color: 'red',
   fontSize: '12px',
   position: 'absolute',
}))
