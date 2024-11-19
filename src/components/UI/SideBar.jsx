import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import { styled, Typography } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import { Fragment, useState } from 'react';
import LogOutModal from './LogOutModal';
import { useTranslation } from 'react-i18next';

import Ulutman from '../../assets/icons/ulutman-logo-icon.svg?react';
import Arrow from '../../assets/icons/down-arrow-icon.svg?react';

const StyledArrow = styled(Arrow)(() => ({}));

const dataArray = [
   { key: 'dashboard', value: 'Статистика' },
   {
      key: 'users',
      value: 'Пользователи',
      icon: <StyledArrow />,
      subData: [
         {
            key: 'mailing',
            value: 'email - рассылки',
         },
      ],
   },
   { key: 'ads', value: 'Объявления' },
   { key: 'categories', value: 'Категории' },
   {
      key: 'moderation',
      value: 'Модерация',
      icon: <StyledArrow />,
      subData: [
         {
            key: 'complaints',
            value: 'Управление жалобами и нарушениями',
         },
         {
            key: 'comments',
            value: 'Модерация комментариев и сообщений',
         },
      ],
   },
   { key: 'advertising', value: 'Реклама' },
];

export const SideBar = () => {
   const { t } = useTranslation();
   const navigate = useNavigate();

   const [openModal, setOpenModal] = useState(false);
   const [activeSubLink, setActiveSubLink] = useState(null);
   const toggleModal = () => setOpenModal(prev => !prev);

   const toggleSubLink = key => {
      setActiveSubLink(prev => (prev === key ? null : key));
   };

   const DrawerList = (
      <Box sx={{ width: 250 }}>
         <UlutmanLogo onClick={() => navigate('/admin')}>
            <Ulutman />
         </UlutmanLogo>
         <List>
            {dataArray.map(item => (
               <Fragment key={item.key}>
                  <ListItemStyle>
                     <NavStyle
                        to={item.key}
                        onClick={() => item.subData && toggleSubLink(item.key)}
                     >
                        {t(`admin.sideBar.${item.key}`)}
                        {item.icon && item.icon}
                     </NavStyle>
                  </ListItemStyle>
                  {item.subData &&
                  item.subData.length > 0 &&
                  activeSubLink === item.key
                     ? item.subData.map(subItem => (
                          <SubListItem key={subItem.key}>
                             <NavStyle to={`${item.key}/${subItem.key}`}>
                                <Typography>
                                   {t(`admin.sideBar.subLinks.${subItem.key}`)}
                                </Typography>
                             </NavStyle>
                          </SubListItem>
                       ))
                     : null}
               </Fragment>
            ))}
         </List>
         <br />
         <Divider />
         <br />
         <List>
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
   position: 'sticky',
   background: '#fff',
   top: '0',
   left: '0',
   zIndex: '100',
}));

const ListItemStyle = styled(ListItem)(() => ({
   paddingTop: '0px',
   paddingBottom: '0px',
   margin: '0 0 5px 0',
}));

const SubListItem = styled(ListItem)(() => ({
   paddingTop: '0px',
   paddingBottom: '0px',
   margin: '0 0 5px 10px',
}));

const NavStyle = styled(NavLink)(() => ({
   width: '192px',
   borderRadius: '6px',
   textDecoration: 'none',
   fontWeight: '600',
   fontSize: '14px',
   color: '#282828',
   padding: '16px 30px 16px ',
   transition: '400ms',

   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',

   '& .MuiTypography-root': {
      textWrap: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      fontWeight: '600',
      fontSize: '14px',
      color: '#282828',
   },

   '&:hover': {
      background: '#7e52ff',
      color: '#fff',

      '& .MuiTypography-root': {
         color: '#fff',
      },

      path: {
         fill: '#fff',
      },
   },

   '&.active': {
      background: '#7e52ff',
      color: '#fff',

      '& .MuiTypography-root': {
         color: '#fff',
      },

      path: {
         fill: '#fff',
      },
   },

   path: {
      fill: '#222',
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
