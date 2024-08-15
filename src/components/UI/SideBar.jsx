import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import Ulutman from '../../assets/icons/ulutman-logo-icon.svg?react';
import { styled, Typography } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import LogOutModal from './LogOutModal';
import { useTranslation } from 'react-i18next';

export const SideBar = () => {
   const { t } = useTranslation();
   const navigate = useNavigate();
   const [openModal, setOpenModal] = useState(false);

   const toggleModal = () => setOpenModal(prev => !prev);

   const DrawerList = (
      <Box sx={{ width: 250 }}>
         <UlutmanLogo onClick={() => navigate('/admin')}>
            <Ulutman />
         </UlutmanLogo>
         <List>
            <ListItemStyle>
               <NavStyle to="dashboard">
                  {t('admin.sideBar.dashboard')}
               </NavStyle>
            </ListItemStyle>

            <ListItemStyle>
               <NavStyle to="users">{t('admin.sideBar.users')}</NavStyle>
            </ListItemStyle>

            <ListItemStyle>
               <NavStyle to="ads">{t('admin.sideBar.ads')}</NavStyle>
            </ListItemStyle>

            <ListItemStyle>
               <NavStyle to="categories">
                  {t('admin.sideBar.categories')}
               </NavStyle>
            </ListItemStyle>

            <ListItemStyle>
               <NavStyle to="moderation">
                  {t('admin.sideBar.moderation')}
               </NavStyle>
            </ListItemStyle>

            <ListItemStyle>
               <NavStyle to="add-mailing">
                  {t('admin.sideBar.mailing')}
               </NavStyle>
            </ListItemStyle>
         </List>
         <br />
         <Divider />
         <br />
         <List>
            <ListItemStyle>
               <NavStyle to={'settings'}>
                  {t('admin.sideBar.settings')}
               </NavStyle>
            </ListItemStyle>
            <ListItemStyle>
               <LogOutBtn onClick={toggleModal}>
                  {t('admin.sideBar.logOut')}
               </LogOutBtn>
            </ListItemStyle>
         </List>
      </Box>
   );

   return (
      <>
         <DrawerStyle>{DrawerList}</DrawerStyle>
         <LogOutModal open={openModal} onClose={toggleModal} />
      </>
   );
};

const UlutmanLogo = styled('div')(() => ({
   cursor: 'pointer',
   svg: {
      width: '134px',
      height: '29px',
      margin: ' 22px 53px 60px 53px',
   },
}));
const DrawerStyle = styled(Box)(() => ({
   width: '250px',
   height: '100vh',
   position: 'sticky',
   background: '#fff',
   top: '0',
   left: '0',
   zIndex: '100',
}));

const ListItemStyle = styled(ListItem)(() => ({
   paddingTop: '0px',
   paddingBottom: '0px',
}));
const NavStyle = styled(NavLink)(() => ({
   width: '192px',
   height: '50px',
   borderRadius: '6px',
   textDecoration: 'none',
   fontWeight: '600',
   fontSize: '14px',
   color: '#282828',
   padding: '16px 0px 16px 30px',
   transition: '400ms',
   '&:hover': {
      background: '#7e52ff',
      color: '#fff',
   },

   '&.active': {
      background: '#7e52ff',
      color: '#fff',
   },
}));

const LogOutBtn = styled(Typography)(() => ({
   width: '192px',
   height: '50px',
   borderRadius: '6px',
   textDecoration: 'none',
   fontWeight: '600',
   fontSize: '14px',
   color: '#282828',
   padding: '16px 0px 16px 30px',
   transition: '400ms',
   '&:hover': {
      background: '#7e52ff',
      color: '#fff',
   },
   cursor: 'pointer',
}));
