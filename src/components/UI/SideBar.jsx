import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import { useState } from 'react';
import Ulutman from '../../assets/icons/ulutman-logo-icon.svg?react';
import { styled } from '@mui/material';

export const SideBar = () => {
   const [open, setOpen] = useState(true);

   const DrawerList = (
      <Box sx={{ width: 250 }}>
         <UlutmanLogo>
            <Ulutman />
         </UlutmanLogo>
         <List>
            <ListItemStyle>
               <NavStyle href="#">Dashboard</NavStyle>
            </ListItemStyle>
            <ListItemStyle>
               <NavStyle href="#">Польвователи</NavStyle>
            </ListItemStyle>
            <ListItemStyle>
               <NavStyle href="#">Объявления</NavStyle>
            </ListItemStyle>
            <ListItemStyle>
               <NavStyle href="#">Категории</NavStyle>
            </ListItemStyle>
            <ListItemStyle>
               <NavStyle href="#">Модерация</NavStyle>
            </ListItemStyle>
         </List>
         <Divider />
         <List>
            <ListItemStyle>
               <NavStyle href="#">Настройки</NavStyle>
            </ListItemStyle>
            <ListItemStyle>
               <NavStyle href="#">Выйти</NavStyle>
            </ListItemStyle>
         </List>
      </Box>
   );
   return (
      <>
         <DrawerStyle open={open}>{DrawerList}</DrawerStyle>
      </>
   );
};

const UlutmanLogo = styled('div')(() => ({
   svg: {
      width: '134px',
      height: '29px',
      margin: ' 22px 53px 60px 53px',
   },
}));
const DrawerStyle = styled(Drawer)(() => ({
   '& .MuiDrawer-paper': {
      borderRight: '1px solid #e0e0e0',
   },
   '.MuiList-root': {
      padding: '0px 24px 0px 24px',
   },
}));

const ListItemStyle = styled(ListItem)(() => ({
   paddingTop: '0px',
   paddingBottom: '0px',
}));
const NavStyle = styled('a')(() => ({
   width: '192px',
   height: '50px',
   borderRadius: '6px',
   textDecoration: 'none',
   fontWeight: '600',
   fontSize: '14px',
   color: '#282828',
   padding: '16px 0px 16px 30px',
   '&:hover': {
      background: '#7e52ff',
      color: '#fff',
      color: '#fff',
   },
}));
