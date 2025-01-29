import { Outlet } from 'react-router-dom'
import { styled } from '@mui/material'
import { Header } from '../Header'
import Footer from '../../components/main-page/Footer'

export const MainLayout = () => {
   return (
      <div>
         <Header />
         <OutletContent>
            <Outlet />
         </OutletContent>
         <Footer />
      </div>
   )
}

const OutletContent = styled('div')(({ theme }) => ({
   minHeight: '100vh',
   marginTop: '84px',

   [theme.breakpoints.down('md')]: {
      marginTop: '54px',
   },
}))
