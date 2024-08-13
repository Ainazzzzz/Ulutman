import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import Ulutman from '../../assets/icons/ulutman-logo-icon.svg?react';
import { styled, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import LogOutModal from './LogOutModal';

export const SideBar = () => {
   const [openModal, setOpenModal] = useState(false);

   const toggleModal = () => setOpenModal(prev => !prev);

   const DrawerList = (
      <Box sx={{ width: 250 }}>
         <UlutmanLogo>
            <Ulutman />
         </UlutmanLogo>
         <List>
            <ListItemStyle>
               <NavStyle to="dashboard">Статистика</NavStyle>
            </ListItemStyle>
            <ListItemStyle>
               <NavStyle to="users">Пользователи</NavStyle>
            </ListItemStyle>
            <ListItemStyle>
               <NavStyle to="ads">Объявления</NavStyle>
            </ListItemStyle>
            <ListItemStyle>
               <NavStyle to="categories">Категории</NavStyle>
            </ListItemStyle>
            <ListItemStyle>
               <NavStyle to="moderation">Модерация</NavStyle>
            </ListItemStyle>
            <ListItemStyle>
               <NavStyle to="add-mailing">Рассылки</NavStyle>
            </ListItemStyle>
         </List>
         <br />
         <Divider />
         <br />
         <List>
            <ListItemStyle>
               <NavStyle to={'settings'}>Настройки</NavStyle>
            </ListItemStyle>
            <ListItemStyle>
               <LogOutBtn onClick={toggleModal}>Выйти</LogOutBtn>
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
