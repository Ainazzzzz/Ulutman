import { Outlet } from 'react-router-dom';
import AdminHeader from '../../components/Admin/AdminHeader';
import { SideBar } from '../../components/UI/SideBar';
import { styled, useMediaQuery } from '@mui/material';

export const AdminLayout = () => {
   const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'));

   return (
      <>
         <Nav>
            {!isMobile && <SideBar />}

            <Cont>
               <AdminHeader />
               <Outlet />
            </Cont>
         </Nav>
      </>
   );
};

const Nav = styled('div')(() => ({
   display: 'flex',
   height: '100vh',
}));

const Cont = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   width: '100%',
}));
