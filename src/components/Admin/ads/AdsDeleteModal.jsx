import { useState } from 'react';
import Modal from '../../UI/Modal';
import { styled } from '@mui/material';

export const AdsDeleteModal = ({ isOpen, onClose }) => {
   return (
      <Modal open={isOpen} handleClose={onClose} variant="delete">
         <Container>
            <Title>Вы уверены, что хотите удалить?</Title>
            <div>
               <FirstButton onClick={onClose}>Отменить</FirstButton>
               <SecondButton>Удалить</SecondButton>
            </div>
         </Container>
      </Modal>
   );
};

const Container = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '35px',
   div: {
      justifyContent: 'center',
      display: 'flex',
      gap: '40px',
   },
}));

const Title = styled('p')(({ theme }) => ({
   fontWeight: '500',
   fontSize: '17px',
   color: '#202020',
   [theme.breakpoints.down('md')]: {
      fontSize: '16px',
   },
}));
const FirstButton = styled('button')(() => ({
   fontWeight: '500',
   fontSize: '17px',
   color: '#282828',
   width: '120px',
   height: '46px',
   borderRadius: '8px',
   border: '1px solid #282828',
   background: 'transparent',
   cursor: 'pointer',
}));
const SecondButton = styled('button')(() => ({
   fontWeight: '500',
   fontSize: '17px',
   color: '#ff0000',
   width: '120px',
   height: '46px',
   borderRadius: '8px',
   border: '1px solid #ff0000',
   background: 'transparent',
   cursor: 'pointer',
}));
