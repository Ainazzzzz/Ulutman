import React from 'react'
import { styled, Typography } from '@mui/material'
import { NavLink } from 'react-router-dom'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import Modal from '../../../components/UI/Modal'
import CloseIcon from '../../../assets/icons/cross-icon.svg?react'
import Input from '../../../components/UI/Input'
import { Button } from '../../../components/UI/Button'
import { signUpSchema } from '../../../utils/general/validation/authValidation'
import { signUp } from '../../../redux/auth/authThunk'
import Spinner from '../../../components/UI/Spinner'

const signUpInputs = [
   {
      label: 'Введите имя',
      value: 'name',
      type: 'text',
   },
   {
      label: 'Введите email',
      value: 'email',
      type: 'email',
   },
   {
      label: 'Введите пароль',
      value: 'password',
      type: 'password',
   },
   {
      label: 'Подтвердите пароль',
      value: 'confirmPassword',
      type: 'password',
   },
]

// Создаем схему валидации с помощью Yup

const SignUp = ({ open, onClose, handleOpenModal }) => {
   const dispatch = useDispatch()
   const { isLoading } = useSelector(state => state.auth)

   const submitHandler = val => {
      dispatch(signUp({ val, onClose }))
   }

   const { values, handleChange, handleSubmit, errors, touched } = useFormik({
      initialValues: {
         name: '',
         email: '',
         password: '',
         confirmPassword: '',
      },
      validationSchema: signUpSchema,
      onSubmit: values => {
         submitHandler(values)
      },
   })

   const handleOpenSignInModal = () => {
      handleOpenModal()
      onClose()
   }

   return (
      <Modal open={open} handleClose={onClose}>
         <IconStyle>
            <CloseIcon onClick={onClose} />
         </IconStyle>
         <Box onSubmit={handleSubmit}>
            <h2>Регистрация</h2>
            {signUpInputs.map(item => (
               <div key={item.value} style={{ position: 'relative' }}>
                  <Input
                     placeholder={item.label}
                     onChange={handleChange}
                     name={item.value}
                     id={item.value}
                     type={item.type}
                     value={values[item.value]}
                  />
                  {errors[item.value] && touched[item.value] && (
                     <ErrorText
                        style={{
                           position: 'absolute',
                           left: '0px',
                           // top: '0px',
                        }}
                     >
                        {errors[item.value]}
                     </ErrorText>
                  )}
               </div>
            ))}
            {isLoading ? (
               <Button disabled={isLoading}>
                  <Spinner />
               </Button>
            ) : (
               <Button type="submit">Регистрация</Button>
            )}

            <Typography align="center">
               У вас есть аккаунт?{' '}
               <NavLink to="" onClick={handleOpenSignInModal}>
                  Войти
               </NavLink>
            </Typography>
         </Box>
      </Modal>
   )
}

export default SignUp

const Box = styled('form')(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '20px',
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

const ErrorText = styled('p')({
   color: 'red',
   fontSize: '12px',
})
