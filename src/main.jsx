import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ThemeProvider } from '@mui/material';
import theme from './utils/constants/themes.js';
import { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Provider } from 'react-redux';
import { store } from './redux/store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
   <React.StrictMode>
      <Provider store={store}>
         <SkeletonTheme color="#d9d9d9">
            <ThemeProvider theme={theme}>
               <App />
            </ThemeProvider>
         </SkeletonTheme>
      </Provider>
   </React.StrictMode>,
);
