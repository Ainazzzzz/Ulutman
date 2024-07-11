import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ThemeProvider } from '@mui/material';
import theme from './utils/constants/themes.js';
import { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Toastify from './components/UI/Toastify.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
   <React.StrictMode>
      <SkeletonTheme color="#d9d9d9">
         <ThemeProvider theme={theme}>
            <Toastify />
            <App />
         </ThemeProvider>
      </SkeletonTheme>
   </React.StrictMode>,
);
