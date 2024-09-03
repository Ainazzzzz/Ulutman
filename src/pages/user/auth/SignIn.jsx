import { useState } from 'react';
import Modal from '../../../components/UI/Modal.jsx';
import CloseIcon from '../../../assets/icons/cross-icon.svg?react';
import Input from '../../../components/UI/Input.jsx';
import { Button } from '../../../components/UI/Button.jsx';
import { styled, Typography } from '@mui/material';
import { ConditionConsent } from './ConditionConsent.jsx';
import { NavLink } from 'react-router-dom';
import SignUp from './signUp.jsx';
import { useDispatch } from 'react-redux';
import { signIn } from '../../../redux/auth/authThunk.js';

export const SignIn = ({ open, onClose, onOpen }) => {
   const dispatch = useDispatch();

   const [isOpen, setIsOpen] = useState(false);
   const [openSignUp, setOpenSignUp] = useState(false);
   const [emailError, setEmailError] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   const validateEmail = email => {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email);
   };

   const handleEmailChange = event => {
      setEmail(event.target.value);
   };

   const handlePasswordChange = event => {
      setPassword(event.target.value);
   };

   const handleOpenSignUp = () => {
      setOpenSignUp(true);
      onClose();
   };

   const handleCloseSignUp = () => setOpenSignUp(false);

   const handleSubmit = e => {
      e.preventDefault();

      const newData = {
         email,
         password,
      };

      dispatch(signIn({ userData: newData, onClose }));
   };

   return (
      <>
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
               />
               <Input
                  placeholder="Введите пароль"
                  value={password}
                  onChange={handlePasswordChange}
               />
               {emailError && <ErrorText>{emailError}</ErrorText>}
               <Button type={'submit'}>Войти</Button>
               <Typography align="center">
                  У вас нету аккаунта?{' '}
                  <NavLink to={''} onClick={handleOpenSignUp}>
                     Создайте её
                  </NavLink>
               </Typography>
            </Box>
         </Modal>
         <SignUp
            open={openSignUp}
            onClose={handleCloseSignUp}
            onOpen={onOpen}
         />

         {isOpen ? (
            <ConditionConsent
               signInModal={setIsOpen}
               conditionModal={setIsOpen}
            />
         ) : null}
      </>
   );
};

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
