import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { store } from './redux/store.js';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material';
import theme from './utils/constants/themes.js';
import { SkeletonTheme } from 'react-loading-skeleton';
import Toastify from './components/UI/Toastify.jsx';

import './index.css';
import 'react-loading-skeleton/dist/skeleton.css';
import './i18n';
import { injectStore } from './config/axiosInstance.js';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

injectStore(store);

ReactDOM.createRoot(document.getElementById('root')).render(
   <React.StrictMode>
      <Provider store={store}>
         <SkeletonTheme color="#d9d9d9">
            <ThemeProvider theme={theme}>
               <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Toastify />
                  <Suspense fallback="...loading">
                     <App />
                  </Suspense>
               </LocalizationProvider>
            </ThemeProvider>
         </SkeletonTheme>
      </Provider>
   </React.StrictMode>,
);
