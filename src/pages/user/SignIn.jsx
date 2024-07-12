import { useState } from 'react';
import Modal from '../../components/UI/Modal';
import CloseIcon from '../../assets/icons/cross-icon.svg?react';
import Input from '../../components/UI/Input';
import { Button } from '../../components/UI/Button';
import { styled } from '@mui/material';
import { ConditionConsent } from './ConditionConsent';

export const SignIn = () => {
   const [isOpen, setIsOpen] = useState(true);
   const [open, setOpen] = useState(false);
   const [emailError, setEmailError] = useState('');
   const [email, setEmail] = useState('');

   const handleClose = () => setIsOpen(!isOpen);

   const validateEmail = email => {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email);
   };

   const handleEmailChange = event => {
      setEmail(event.target.value);
   };

   const handleClick = () => {
      if (validateEmail(email)) {
         setIsOpen(!isOpen);
         setOpen(!open);
         setEmailError(''); // Очистить ошибку, если email валидный
      } else {
         setEmailError('Введите корректный email');
      }
   };

   return (
      <div>
         <Modal open={isOpen} onClose={handleClose}>
            <IconStyle>
               <CloseIcon onClick={handleClose} />
            </IconStyle>
            <Box>
               <h2>Войти или зарегистрироваться</h2>
               <Input
                  placeholder="Введите email"
                  value={email}
                  onChange={handleEmailChange}
               />
               {emailError && <ErrorText>{emailError}</ErrorText>}
               {open ? (
                  <ConditionConsent />
               ) : (
                  <Button onClick={handleClick}>Получить код</Button>
               )}
            </Box>
         </Modal>
      </div>
   );
};

const Box = styled('div')(({ theme }) => ({
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
