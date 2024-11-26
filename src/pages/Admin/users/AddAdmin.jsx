import React from 'react'
import { styled } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import ArrowPurpul from '../../../assets/icons/arrowpurpul.svg?react'
import Input from '../../../components/UI/Input'
import { Button } from '../../../components/UI/Button'
import { addAdmin } from '../../../redux/auth/authThunk'
import Spinner from '../../../components/UI/Spinner'

const FORM_INPUTS = [
   {
      name: 'name',
      label: 'Имя',
      type: 'text',
      placeholder: 'Ivan Pupkin',
   },
   {
      name: 'email',
      label: 'Почта',
      type: 'email',
      placeholder: 'example@gmail.com',
   },
   {
      name: 'password',
      label: 'Пароль',
      type: 'password',
      placeholder: '',
   },
   {
      name: 'confirmPassword',
      label: 'Подтвердите пароль',
      type: 'password',
      placeholder: '',
   },
]

export const addAdminSchema = Yup.object().shape({
   name: Yup.string()
      .min(2, 'Имя должно быть не короче 2 символов')
      .required('Имя обязательно'),
   email: Yup.string()
      .email('Некорректный email')
      .matches(
         /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
         'Email должен быть адресом @gmail.com',
      )
      .required('Почта обязательна'),
   password: Yup.string()
      .min(6, 'Пароль должен быть не короче 6 символов')
      .required('Пароль обязателен'),
   confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
      .required('Подтверждение пароля обязательно'),
})

const AddAdmin = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const { isLoading, error } = useSelector(state => state.auth)

   const onSubmit = values => {
      dispatch(addAdmin({ adminData: values, navigate }))
   }

   const { handleChange, handleSubmit, errors } = useFormik({
      initialValues: {
         name: '',
         email: '',
         password: '',
         confirmPassword: '',
      },
      onSubmit: values => onSubmit(values),
      validationSchema: addAdminSchema,
   })

   return (
      <div>
         <ContainerTitleArrow>
            <TitleSyle>Добавить администратора </TitleSyle>
            <ArrowBox onClick={() => navigate(-1)}>
               <ArrowPurpul />
               <BackStyle>Назад</BackStyle>
            </ArrowBox>
         </ContainerTitleArrow>
         <FormContainer onSubmit={handleSubmit}>
            {FORM_INPUTS.map(input => (
               <Input
                  key={input.name}
                  label={input.label}
                  placeholder={input.placeholder}
                  type={input.type}
                  name={input.name}
                  helperText={errors[input.name]}
                  error={errors[input.name]}
                  onChange={handleChange}
               />
            ))}

            <ErrorText>{error}</ErrorText>

            <Button type="submit" disabled={isLoading}>
               {isLoading ? <Spinner /> : 'Добавить'}
            </Button>
         </FormContainer>
      </div>
   )
}

export default AddAdmin
const ContainerTitleArrow = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'space-between',
   padding: '0 60px 0 30px',
}))
const ArrowBox = styled('div')(({ theme }) => ({
   display: 'flex',
   paddingTop: '20px',
   cursor: 'pointer',
   [theme.breakpoints.down('md')]: {
      display: 'none',
   },
}))
const FormContainer = styled('form')(() => ({
   padding: '0 30px',
   maxWidth: '500px',
   width: '100%',
   minWidth: '200px',
   display: 'flex',
   flexDirection: 'column',
   gap: '10px',
}))

const TitleSyle = styled('div')(({ theme }) => ({
   color: 'rgb(40, 40, 40)',
   fontSize: '34px',
   fontWeight: '600',
   lineHeight: '51px',
   paddingBottom: '40px',
   [theme.breakpoints.down('md')]: {
      fontSize: '27px',
      fontWeight: '600',
      lineHeight: '36px',
      paddingBottom: '24px',
   },
}))

const BackStyle = styled('p')(() => ({
   color: 'rgb(126, 82, 255)',
   fontFamily: 'Inter',
   fontSize: '14px',
   fontWeight: '400',
   lineHeight: '17px',
}))

const ErrorText = styled('p')({
   color: 'red',
   fontSize: '12px',
})
