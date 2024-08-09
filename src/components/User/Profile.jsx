import { useState } from 'react';
import { styled } from '@mui/material';
import { Button } from '../UI/Button';
import Input from '../UI/Input';
import { useFormik } from 'formik';
import { profileValidation } from '../../utils/general/validation/profileValidation';

export const Profile = () => {
   const [isEmailConfirmed, setIsEmailConfirmed] = useState(true);

   const formik = useFormik({
      initialValues: {
         firstName: '',
         lastName: '',
         phone: '',
         email: '',
      },
      validationSchema: profileValidation,
      onSubmit: values => {
         console.log(values);
      },
   });

   const sendEmailLink = () => {
      if (!formik.values.email) {
         setIsEmailConfirmed(false);
      } else {
         setIsEmailConfirmed(true);
         console.log('sendEmailLink');
      }
   };

   return (
      <Form onSubmit={formik.handleSubmit}>
         <WrapperFullName>
            <Container>
               <StyledInput
                  label="Имя"
                  placeholder="Иван"
                  name="firstName"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  autoComplete="given-name"
               />

               {formik.touched.firstName && formik.errors.firstName ? (
                  <ErrorMessage>{formik.errors.firstName}</ErrorMessage>
               ) : null}
            </Container>

            <Container>
               <StyledInput
                  label="Фамилия"
                  placeholder="Иванов"
                  name="lastName"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  autoComplete="family-name"
               />

               {formik.touched.lastName && formik.errors.lastName ? (
                  <ErrorMessage>{formik.errors.lastName}</ErrorMessage>
               ) : null}
            </Container>
         </WrapperFullName>

         <Container>
            <StyledInput
               label="Телефон"
               type="number"
               placeholder="+7 xxx xxxxxxx"
               name="phone"
               value={formik.values.phone}
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
               autoComplete="tel"
            />

            {formik.touched.phone && formik.errors.phone ? (
               <ErrorMessage>{formik.errors.phone}</ErrorMessage>
            ) : null}
         </Container>

         <WrapperEmailConfirmation>
            <Container>
               <EmailInput
                  label="Электронная почта"
                  type="email"
                  placeholder="example@mail.com"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  autoComplete="email"
                  confirmed={!isEmailConfirmed && 'Не подтвержден'}
               />

               {formik.touched.email && formik.errors.email ? (
                  <ErrorMessage>{formik.errors.email}</ErrorMessage>
               ) : null}
            </Container>

            <ConfirmationLink onClick={sendEmailLink}>
               Отправить ссылку для подтверждения
            </ConfirmationLink>
         </WrapperEmailConfirmation>

         <StyledButton type="submit">Сохранить</StyledButton>
      </Form>
   );
};
const Form = styled('form')(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '24px',
   padding: '40px 57px',
   [theme.breakpoints.down('md')]: {
      padding: '40px 16px',
   },
}));

const WrapperFullName = styled('div')(({ theme }) => ({
   width: '100%',
   display: 'flex',
   gap: '24px',
   [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
   },
}));

const StyledInput = styled(Input)(({ theme }) => ({
   width: '327px',
   [theme.breakpoints.down('md')]: {
      width: '100%',
      maxWidth: '463px',
   },
}));

const EmailInput = styled(Input)(({ theme }) => ({
   maxWidth: '678px',
   [theme.breakpoints.down('md')]: {
      width: '100%',
      maxWidth: '463px',
   },
}));

const ConfirmationLink = styled('p')(() => ({
   maxWidth: '300px',
   minHeight: '33px',
   border: '1px solid #7E52FF',
   background: '#7E52FF1A',
   padding: '8px 10px 8px 10px',
   borderRadius: '8px',
   color: '#7E52FF',
   fontSize: '14px',
   fontWeight: '500',
   cursor: 'pointer',
}));

const WrapperEmailConfirmation = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '18px',
}));

const StyledButton = styled(Button)(({ theme }) => ({
   width: '144px',
   marginTop: '16px',

   [theme.breakpoints.down('md')]: {
      width: '100%',
      maxWidth: '463px',
   },
}));

const ErrorMessage = styled('div')(() => ({
   color: 'red',
   fontSize: '12px',
   position: 'absolute',
   bottom: '-15px',
   left: '5px',
}));

const Container = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   position: 'relative',
}));
