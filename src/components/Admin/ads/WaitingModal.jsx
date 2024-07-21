import { useState } from 'react';
import Modal from '../../UI/Modal';
import { styled } from '@mui/material';
import { toast } from 'react-toastify';
import Toastify from '../../UI/Toastify';

export const WaitingModal = () => {
   const [isOpen, setIsOpen] = useState(true);

   const handleCloseModal = () => setIsOpen(!isOpen);

   const notifySucces = () => toast.success('Успешно');
   const notifyError = () => toast.error('Ошибка');
   return (
      <Modal open={isOpen} onClose={handleCloseModal} variant="info">
         <Container>
            <Title>Вы уверены, что хотите изменить?</Title>
            <div>
               <FirstButton onClick={notifySucces}>Одобрить</FirstButton>
               <SecondButton onClick={notifyError}>Отклонить</SecondButton>
            </div>
         </Container>
         <Toastify />
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

const Title = styled('p')(() => ({
   fontWeight: '500',
   color: '#202020',
}));
const FirstButton = styled('button')(() => ({
   fontWeight: '500',
   fontSize: '17px',
   color: '#fff',
   width: '120px',
   height: '46px',
   borderRadius: '8px',
   border: 'none',
   background: '#5eb00e',
   cursor: 'pointer',
}));
const SecondButton = styled('button')(() => ({
   fontWeight: '500',
   fontSize: '17px',
   color: '#fff',
   width: '120px',
   height: '46px',
   borderRadius: '8px',
   border: 'none',
   background: '#f00',
   cursor: 'pointer',
}));
