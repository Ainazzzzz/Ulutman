import { Outlet } from 'react-router-dom';
import { Header } from '../Header';
import Footer from '../../components/main-page/Footer';

export const MainLayout = () => {
   return (
      <div>
         <Header />
         <Outlet />
         <Footer />
      </div>
   );
};
