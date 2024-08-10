import React from 'react';
import Modal from './Modal';
import { Button } from './Button';
import { styled } from '@mui/material';

const LogOutModal = ({ open, onClose }) => {
   return (
      <Modal open={open} handleClose={onClose}>
         <Container>
            <p>Вы действительно хотите выйти?</p>

            <div>
               <Button onClick={onClose}>Да</Button>
               <Button variant="" onClick={onClose}>
                  Нет
               </Button>
            </div>
         </Container>
      </Modal>
   );
};

export default LogOutModal;

const Container = styled('div')(() => ({
   textAlign: 'center',

   p: {
      margin: '0 0 20px 0',
   },

   div: {
      display: 'flex',
      gap: '20px',
      justifyContent: 'center',
   },
}));
