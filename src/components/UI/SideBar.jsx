import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import Ulutman from '../../assets/icons/ulutman-logo-icon.svg?react';
import { styled, useMediaQuery } from '@mui/material';

export const SideBar = () => {
   const DrawerList = (
      <Box sx={{ width: 250 }}>
         <UlutmanLogo>
            <Ulutman />
         </UlutmanLogo>
         <List>
            <ListItemStyle>
               <NavStyle href="dashboard">Dashboard</NavStyle>
            </ListItemStyle>
            <ListItemStyle>
               <NavStyle href="users">Пользователи</NavStyle>
            </ListItemStyle>
            <ListItemStyle>
               <NavStyle href="ads">Объявления</NavStyle>
            </ListItemStyle>
            <ListItemStyle>
               <NavStyle href="categories">Категории</NavStyle>
            </ListItemStyle>
            <ListItemStyle>
               <NavStyle href="moderation">Модерация</NavStyle>
            </ListItemStyle>
            <ListItemStyle>
               <NavStyle href="add-mailing">Рассылки</NavStyle>
            </ListItemStyle>
         </List>
         <br />
         <Divider />
         <br />
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

   return <DrawerStyle>{DrawerList}</DrawerStyle>;
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
   transition: '400ms',
   '&:hover': {
      background: '#7e52ff',
      color: '#fff',
   },
}));
