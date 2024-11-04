import { Outlet } from 'react-router-dom';
import { Header } from '../Header';
import Footer from '../../components/main-page/Footer';
import { styled } from '@mui/material';

export const MainLayout = () => {
   return (
      <div>
         <Header />
         <OutletContent>
            <Outlet />
         </OutletContent>
         <Footer />
      </div>
   );
};

const OutletContent = styled('div')(() => ({
   minHeight: '100vh',
}));
