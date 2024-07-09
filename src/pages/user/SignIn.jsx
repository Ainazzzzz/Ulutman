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

   const handleClose = () => setIsOpen(!isOpen);
   const handleClick = () => {
      setIsOpen(!isOpen);
      setOpen(!open);
   };

   return (
      <div>
         <ModalStyle open={isOpen} onClose={handleClose}>
            <IconStyle>
               <CloseIcon onClick={handleClose} />
            </IconStyle>
            <Box>
               <h2>Войти или зарегистрироваться</h2>
               <Input placeholder="Введите email" />
               {open ? (
                  <ConditionConsent />
               ) : (
                  <Button onClick={handleClick}>Получить код</Button>
               )}
            </Box>
         </ModalStyle>
      </div>
   );
};

const ModalStyle = styled(Modal)(({ theme }) => ({
   //    '& .MuiDialog-paper': {
   width: '300px', // Пример задания ширины
   //   padding: '20px', // Пример задания отступов
   //    },
}));

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
