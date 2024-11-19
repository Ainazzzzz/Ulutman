import { styled } from '@mui/material';
import Modal from '../UI/Modal';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSelectedAds } from '../../redux/users/myAdsThunk';
import Toastify from '../UI/Toastify';
import { showToast } from '../../hooks/useToast';

export const DeleteMyAdsModal = ({ userId, selectedIds }) => {
   const [isOpen, setIsOpen] = useState(true);
   const dispatch = useDispatch();

   const errorMessage = useSelector(state => state.myAds.errorMessage);

   const handleDeleteSelectedAds = () => {
      if (selectedIds.length > 0) {
         dispatch(deleteSelectedAds({ userId, selectedIds }));
      }
      setIsOpen(false);
   };

   const handleCloseModal = () => {
      setIsOpen(!isOpen);
   };

   // useEffect(() => {
   //    if (errorMessage) {
   //       // Toastify.error(errorMessage); /
   //       showToast('error', errorMessage);
   //    }
   // }, [errorMessage]);

   return (
      <Modal open={isOpen} handleClose={handleCloseModal} variant="delete">
         <Container>
            <Title>Вы уверены, что хотите удалить?</Title>
            {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
            <div>
               <FirstButton onClick={handleCloseModal}>Отменить</FirstButton>

               <SecondButton onClick={handleDeleteSelectedAds}>
                  Удалить
               </SecondButton>
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
   textAlign: 'center',

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

const ErrorText = styled('div')({
   marginTop: '10px',
   color: 'red',
   fontSize: '14px',
   textAlign: 'center',
});
