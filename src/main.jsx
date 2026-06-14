import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@mui/material'
import { SkeletonTheme } from 'react-loading-skeleton'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'
import { store } from './redux/store'
import theme from './utils/constants/themes'
import Toastify from './components/UI/Toastify'

import './index.css'
import 'react-loading-skeleton/dist/skeleton.css'
import './i18n'
import { injectStore } from './config/axiosInstance'

injectStore(store)
console.log('app')

ReactDOM.createRoot(document.getElementById('root')).render(
   <React.StrictMode>
      <HelmetProvider>
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
      </HelmetProvider>
   </React.StrictMode>,
)
