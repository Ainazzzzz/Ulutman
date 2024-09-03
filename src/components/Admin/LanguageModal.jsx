import React, { useState } from 'react';
import Modal from '../UI/Modal.jsx';
import { languages } from '../../utils/constants/languages.js';
import { renderFlag } from '../../utils/general/renderFlag.jsx';
import { Box, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';

const LanguageModal = ({ open, onClose }) => {
   const { i18n } = useTranslation();
   const [currentLanguage, setCurrentLanguage] = useState('ru');

   const changeLanguage = value => {
      i18n.changeLanguage(value);
      setCurrentLanguage(value);
      onClose();
   };

   return (
      <Modal open={open} onClose={onClose}>
         <LanguageContainer>
            {languages.map(item => (
               <Languages
                  key={item.value}
                  onClick={() => changeLanguage(item.value)}
                  active={(currentLanguage === item.value).toString()}
               >
                  <div>{renderFlag(item.value)}</div>
                  <span>{item.label}</span>
               </Languages>
            ))}
         </LanguageContainer>
      </Modal>
   );
};

export default LanguageModal;

const LanguageContainer = styled(Box)(({ theme }) => ({}));

const Languages = styled(Box)(({ active }) => ({
   display: 'flex',
   gap: '20px',
   cursor: 'pointer',
   margin: '0 0 10px 0',
   padding: '10px',
   borderRadius: '10px',
   alignItems: 'center',
   transition: '500ms',
   backgroundColor: active === 'true' ? '#7e52ff' : '#fff',
   color: active === 'true' ? '#fff' : '#222',

   '&:nth-of-type(5)': {
      margin: '0',
   },
   ':hover': {
      backgroundColor: '#7e52ff',
      color: '#fff',
   },
}));
