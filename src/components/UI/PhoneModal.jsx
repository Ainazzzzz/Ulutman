import React, { useState } from 'react';
import Modal from './Modal';
import { styled } from '@mui/material';

export const PhoneModal = ({ handleClose }) => {
   const [isOpen, setIsOpen] = useState(true);

   return (
      <Modal open={isOpen} handleClose={handleClose} variant="phone">
         <Block>
            <p>Номер телефона</p>
            <span>+7 965 137-95-07</span>
         </Block>
      </Modal>
   );
};

const Block = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   gap: '24px',
   p: {
      fontFamily: 'Inter',
      fontSize: '20px',
      fontWeight: '400',
      color: '#202020',
   },
   span: {
      fontFamily: 'Inter',
      fontSize: '24px',
      fontWeight: '500',
      color: '#282828',
   },
}));
