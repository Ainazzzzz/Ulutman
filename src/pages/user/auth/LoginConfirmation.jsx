import { useEffect, useState } from 'react';
import { Button } from '../../../components/UI/Button.jsx';
import Input from '../../../components/UI/Input.jsx';
import Modal from '../../../components/UI/Modal.jsx';
import { styled } from '@mui/material';
import CloseIcon from '../../../assets/icons/cross-icon.svg?react';
import { AccountSelection } from '../AccountSelection.jsx';
import { SignIn } from './SignIn.jsx';

export const LoginConfirmation = ({ handleBack }) => {
   const [isOpen, setIsOpen] = useState(true);
   const [code, setCode] = useState('');
   const [error, setError] = useState('');
   const [resendTimeout, setResendTimeout] = useState(0);
   const [openAccount, setOpenAccount] = useState(false);

   const handleClose = () => setIsOpen(!isOpen);

   const handleCheckBoxChange = event => setCode(event.target.value);

   const handleLogin = () => {
      if (code !== '1234') {
         setError('Введён неверный код. Попробуйте ещё раз.');
      } else {
         setError('');
         setIsOpen(!isOpen);
         setOpenAccount(!openAccount);
      }
   };

   const handleResendCode = () => setResendTimeout(30);

   const handleOpenSignIn = () => handleBack();

   useEffect(() => {
      if (resendTimeout > 0) {
         const timer = setInterval(() => {
            setResendTimeout(prev => prev - 1);
         }, 1000);
         return () => clearInterval(timer);
      }
   }, [resendTimeout]);

   return (
      <Modal open={isOpen} onClose={handleClose}>
         <IconStyle>
            <CloseIcon onClick={handleClose} />
         </IconStyle>
         <Box>
            <h2>Подтверждение входа</h2>
            <Block>
               <p>
                  Код подтверждения отправлен на ваш электронный адрес.
                  Проверьте почту и введите код ниже
               </p>

               <span onClick={handleOpenSignIn}>Изменить почту</span>
            </Block>
            <BlockInput>
               <Input
                  placeholder="Код"
                  onChange={handleCheckBoxChange}
                  value={code}
                  error={error}
                  type="number"
               />
               {error && <ErrorMessage>{error}</ErrorMessage>}
               <>
                  {resendTimeout > 0 ? (
                     <span>
                        Отправить код повторно через {resendTimeout} сек.
                     </span>
                  ) : (
                     <span onClick={handleResendCode}>
                        Отправить код повторно
                     </span>
                  )}
               </>
            </BlockInput>
            {openAccount ? (
               <AccountSelection />
            ) : (
               <Button disabled={!code} onClick={handleLogin}>
                  Войти
               </Button>
            )}
         </Box>
      </Modal>
   );
};

const Box = styled('div')(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '30px',
   h2: {
      fontWeight: '600',
      fontSize: '26px',
      textAlign: 'center',
      paddingTop: '50px',
      [theme.breakpoints.down('md')]: {
         fontSize: '24px',
         width: '280px',
      },
   },
}));

const BlockInput = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '14px',
   span: {
      fontWeight: '400',
      fontSize: '14px',
      color: '#1877f2',
      cursor: 'ponter',
   },
}));

const Block = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '4px',
   alignItems: 'center',
   p: {
      fontWeight: '400',
      textAlign: 'center',
   },
   span: {
      fontWeight: '400',
      fontSize: '14px',
      color: '#1877f2',
      cursor: 'pointer',
   },
}));

const ErrorMessage = styled('div')(() => ({
   color: 'red',
   fontWeight: '400',
   fontSize: '14px',
}));

const IconStyle = styled('div')(() => ({
   svg: {
      position: 'absolute',
      top: '26px',
      right: '26px',
      cursor: 'pointer',
   },
}));
