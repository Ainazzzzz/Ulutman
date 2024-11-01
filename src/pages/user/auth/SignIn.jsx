import { useState } from 'react';
import Modal from '../../../components/UI/Modal.jsx';
import Input from '../../../components/UI/Input.jsx';
import { Button } from '../../../components/UI/Button.jsx';
import SignUp from './signUp.jsx';
import { signIn } from '../../../redux/auth/authThunk.js';
import { styled, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '../../../assets/icons/cross-icon.svg?react';
import Spinner from '../../../components/UI/Spinner';

export const SignIn = ({ open, onClose, onOpen }) => {
   const dispatch = useDispatch();
   const { isLoading } = useSelector(state => state.auth);

   const [openSignUp, setOpenSignUp] = useState(false);
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [error, setError] = useState('');

   const handleEmailChange = event => {
      setEmail(event.target.value);
      setError('');
   };

   const handlePasswordChange = event => {
      setPassword(event.target.value);
      setError('');
   };

   const handleOpenSignUp = () => {
      setOpenSignUp(true);
      onClose();
   };

   const handleCloseSignUp = () => setOpenSignUp(false);

   const handleSubmit = e => {
      e.preventDefault();

      if (!email || !password) {
         setError('Пожалуйста, заполните все поля.');
         return;
      }

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
               <div style={{ position: 'relative' }}>
                  <InputContainer>
                     <Input
                        placeholder="Введите email"
                        value={email}
                        onChange={handleEmailChange}
                        id="gmail"
                        type="email"
                     />
                     <Input
                        placeholder="Введите пароль"
                        value={password}
                        onChange={handlePasswordChange}
                        id="pasword"
                        type="password"
                     />
                  </InputContainer>
                  {error && (
                     <ErrorText
                        style={{
                           position: 'absolute',
                           left: '0px',
                        }}
                     >
                        {error}
                     </ErrorText>
                  )}
               </div>

               <Button type={'submit'}>Войти</Button>
               <Input
                  placeholder="Введите email"
                  value={email}
                  onChange={handleEmailChange}
                  id="gmail"
                  type="email"
               />
               <Input
                  placeholder="Введите пароль"
                  value={password}
                  onChange={handlePasswordChange}
                  id="pasword"
                  type="password"
               />
               {isLoading ? (
                  <Button disabled={isLoading}>
                     <Spinner />
                  </Button>
               ) : (
                  <Button type={'submit'}>Войти</Button>
               )}
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
const InputContainer = styled('div')({
   display: 'flex',
   flexDirection: 'column',
   gap: '20px',
});
