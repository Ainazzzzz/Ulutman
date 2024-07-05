import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useState } from 'react';
import Ulutman from '../../assets/icons/ulutman-logo-icon.svg?react';
import { styled } from '@mui/material';

export const SideBar = () => {
   const [open, setOpen] = useState(true);

   const toggleDrawer = newOpen => () => {
      setOpen(newOpen);
   };

   const DrawerList = (
      <Box
         sx={{ width: 250 }}
         role="presentation"
         onClick={toggleDrawer(false)}
      >
         <UlutmanLogo>
            <Ulutman />
         </UlutmanLogo>
         <List>
            {[
               'Dashboard',
               'Польвователи',
               'Объявления',
               'Категории',
               'Модерация',
            ].map(text => (
               <ListItem key={text} disablePadding>
                  <ListItemButtonStyle>
                     <ListItemTextStyle primary={text} />
                  </ListItemButtonStyle>
               </ListItem>
            ))}
         </List>
         <Divider />
         <List>
            {['Настройки', 'Выйти'].map(text => (
               <ListItem key={text} disablePadding>
                  <ListItemButtonStyle>
                     <ListItemTextStyle primary={text} />
                  </ListItemButtonStyle>
               </ListItem>
            ))}
         </List>
      </Box>
   );
   return (
      <div>
         <DrawerStyle open={open} onClose={toggleDrawer(false)}>
            {DrawerList}
         </DrawerStyle>
      </div>
   );
};

const UlutmanLogo = styled('div')(() => ({
   svg: {
      width: '134px',
      height: '29px',
      margin: ' 22px 53px 70px 53px',
   },
}));
const DrawerStyle = styled(Drawer)(() => ({
   '& .MuiDrawer-paper': {
      borderRight: '1px solid #e0e0e0',
   },
   '.MuiList-root': {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '10px',
      padding: '0px 24px 0px 24px',
   },
}));
const ListItemButtonStyle = styled(ListItemButton)(() => ({
   borderRadius: '6px',
   paddingLeft: '49px',
   '&:hover': {
      background: '#7e52ff',
      color: '#fff',
      borderRadius: '6px',
   },
}));

const ListItemTextStyle = styled(ListItemText)(() => ({
   '.MuiTypography-root': {
      fontWeight: '600',
      fontSize: '14px',
      '&:hover': {
         color: '#fff',
      },
   },
}));
