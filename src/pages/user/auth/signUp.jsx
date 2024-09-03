import React from 'react';
import Modal from '../../../components/UI/Modal.jsx';
import CloseIcon from '../../../assets/icons/cross-icon.svg?react';
import Input from '../../../components/UI/Input.jsx';
import { Button } from '../../../components/UI/Button.jsx';
import { styled, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { signUpSchema } from '../../../utils/general/validation/authValidation.js';
import { useDispatch } from 'react-redux';
import { signUp } from '../../../redux/auth/authThunk.js'; // Импорт Yup

const signUpInputs = [
   {
      label: 'Имя',
      value: 'name',
      type: 'text',
   },
   {
      label: 'Почта',
      value: 'email',
      type: 'email',
   },
   {
      label: 'Пароль',
      value: 'password',
      type: 'password',
   },
   {
      label: 'Подтвердите пароль',
      value: 'confirmPassword',
      type: 'password',
   },
];

// Создаем схему валидации с помощью Yup

const SignUp = ({ open, onClose, onOpen }) => {
   const dispatch = useDispatch();

   const { values, handleChange, handleSubmit, errors, touched } = useFormik({
      initialValues: {
         name: '',
         email: '',
         password: '',
         confirmPassword: '',
      },
      validationSchema: signUpSchema,
      onSubmit: values => {
         submitHandler(values);
      },
   });

   const submitHandler = val => {
      dispatch(signUp({ val, onClose }));
   };

   const handleOpenSignInModal = () => {
      onOpen();
      onClose();
   };

   return (
      <Modal open={open} handleClose={onClose}>
         <IconStyle>
            <CloseIcon onClick={onClose} />
         </IconStyle>
         <Box onSubmit={handleSubmit}>
            <h2>Регистрация</h2>
            {signUpInputs.map(item => (
               <div key={item.label}>
                  <Input
                     placeholder={item.label}
                     onChange={handleChange}
                     name={item.value}
                     id={item.value}
                     type={item.type}
                     value={values[item.value]}
                  />
                  {errors[item.value] && touched[item.value] && (
                     <ErrorText>{errors[item.value]}</ErrorText>
                  )}
               </div>
            ))}
            <Button type={'submit'}>Регистрация</Button>

            <Typography align="center">
               У вас есть аккаунт?{' '}
               <NavLink to={''} onClick={handleOpenSignInModal}>
                  Войти
               </NavLink>
            </Typography>
         </Box>
      </Modal>
   );
};

export default SignUp;

const Box = styled('form')(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '10px',
   h2: {
      textAlign: 'center',
      fontWeight: '600',
      fontSize: '26px',
      paddingTop: '50px',
      [theme.breakpoints.down('md')]: {
         fontSize: '24px',
      },
   },
}));

const IconStyle = styled('div')(() => ({
   svg: {
      position: 'absolute',
      top: '26px',
      right: '26px',
      cursor: 'pointer',
   },
}));

const ErrorText = styled('p')({
   color: 'red',
   fontSize: '12px',
});
