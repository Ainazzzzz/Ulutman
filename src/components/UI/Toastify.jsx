import { styled } from '@mui/material';
import React from 'react';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const Toastify = () => {
   const options = {
      hideProgressBar: true,
      closeOnClick: true,
      autoClose: 1500,
      draggable: true,
   };

   return <StyledToastContainer {...options} />;
};

export default Toastify;

const StyledToastContainer = styled(ToastContainer)(() => ({
   '.Toastify__toast': {
      color: '#fff',
   },

   '.Toastify__toast--success': {
      backgroundColor: '#018001',
   },

   '.Toastify__toast--error': {
      backgroundColor: '#fe0100',
   },

   svg: {
      fill: '#fff',
   },
}));
