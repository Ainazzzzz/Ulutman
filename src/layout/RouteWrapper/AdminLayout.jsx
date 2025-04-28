import { Outlet } from 'react-router-dom'
import { styled, useMediaQuery } from '@mui/material'
import { SideBar } from '../../components/UI/SideBar'
import { AdminHeaderzb } from '../../components/admin/AdminHeaderZb'

export const AdminLayout = () => {
   const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'))

   return (
      <Nav>
         {!isMobile && <SideBar />}

         <Cont>
            <AdminHeaderzb />
            <Outlet />
         </Cont>
      </Nav>
   )
}

const Nav = styled('div')(() => ({
   display: 'flex',
   minHeight: '100vh',
}))

const Cont = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   width: '100%',
}))
