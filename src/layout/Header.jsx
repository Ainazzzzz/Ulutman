import { styled, Typography, useMediaQuery } from '@mui/material';
import { IconButton } from '../components/IconButton';
import { Button } from '../components/UI/Button';
import ReusableSelect from '../components/UI/Select';
import { languages } from '../utils/constants/languages';
import { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { renderFlag } from '../utils/general/renderFlag';
import { SignIn } from '../pages/user/auth/SignIn.jsx';

import HeartLike from '../assets/icons/white-heart.svg?react';
import UserLogo from '../assets/icons/user.svg?react';
import Plus from '../assets/icons/plus.svg?react';
import MenuIcon from '../assets/icons/menu-icon.svg?react';
import UlutmanLogo from '../assets/icons/ulutman-logo-icon.svg?react';
import MessageIcon from '../assets/icons/message-icon.svg?react';
import ComeIcon from '../assets/icons/come-icon.svg?react';
import WhiteHeart from '../assets/icons/white-heart.svg?react';
import WhiteMessage from '../assets/icons/white-message-icon.svg?react';
import Language from '../assets/icons/language-icon.svg?react';
import LogOutIcon from '../assets/icons/come-icon.svg?react';
import { logOut } from '../redux/auth/authThunk.js';
import { useNavigate } from 'react-router-dom';

const SearchIcon = ({ color = '#ffffff' }) => (
   <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
   >
      <path
         d="M20.9998 21L15.8028 15.803M15.8028 15.803C17.2094 14.3965 17.9996 12.4887 17.9996 10.4995C17.9996 8.51035 17.2094 6.60262 15.8028 5.19605C14.3962 3.78947 12.4885 2.99927 10.4993 2.99927C8.51011 2.99927 6.60238 3.78947 5.19581 5.19605C3.78923 6.60262 2.99902 8.51035 2.99902 10.4995C2.99902 12.4887 3.78923 14.3965 5.19581 15.803C6.60238 17.2096 8.51011 17.9998 10.4993 17.9998C12.4885 17.9998 14.3962 17.2096 15.8028 15.803Z"
         stroke={color}
         strokeWidth="1.5"
         strokeLinecap="round"
         strokeLinejoin="round"
      />
   </svg>
);

export const Header = () => {
   const dispatch = useDispatch();
   const { isAuth, userData } = useSelector(state => state.auth);
   const navigate = useNavigate();

   const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'));

   const [language, setLanguage] = useState('ru');
   const [openMenu, setOpenMenu] = useState(null);
   const [openModal, setOpenModal] = useState(false);

   const handleSelect = event => setLanguage(event.target.value);
   const handleClick = event => setOpenMenu(event.currentTarget);
   const handleClose = () => setOpenMenu(null);

   const handleOpenModal = () => {
      setOpenModal(true);
      handleClose();
   };

   const handleCloseModal = () => {
      setOpenModal(false);
   };

   const logOutHandler = () => {
      dispatch(logOut({ navigate, toggleModal: handleClose }));
   };
   const handleNavigationPage = path => {
      navigate(path);
   };

   const navigateToPageHandler = path => {
      navigate(path);
      handleClose();
   };

   return (
      <>
         <Wrapper>
            <LogoStyle onClick={() => handleNavigationPage('/user')}>
               <UlutmanLogo />
            </LogoStyle>
            {isMobile ? (
               <div>
                  <IconButton onClick={handleClick}>
                     <MenuIcon />
                  </IconButton>
                  <MenuStyle
                     anchorEl={openMenu}
                     open={Boolean(openMenu)}
                     onClose={handleClose}
                  >
                     {!isAuth ? (
                        <MenuItemStyle onClick={handleOpenModal}>
                           <ComeIcon /> Войти
                        </MenuItemStyle>
                     ) : (
                        <MenuItemStyle onClick={logOutHandler}>
                           <LogOutIcon />
                           Выйти
                        </MenuItemStyle>
                     )}
                     <Line />

                     {isAuth && (
                        <MenuItemStyle onClick={handleClose}>
                           <UserLogo />
                           Профиль
                        </MenuItemStyle>
                     )}

                     <MenuItemStyle onClick={handleClose}>
                        <SearchIcon color="#fff" />
                        Поиск
                     </MenuItemStyle>
                     <MenuItemStyle
                        onClick={() => navigateToPageHandler('create-ad')}
                     >
                        <Plus /> Опубликовать
                     </MenuItemStyle>
                     <MenuItemStyle
                        onClick={() => handleNavigationPage('favorite')}
                     >
                        <WhiteHeart />
                        Избранное
                     </MenuItemStyle>
                     <MenuItemStyle
                        onClick={() => handleNavigationPage('messages')}
                     >
                        <WhiteMessage />
                        Сообщения
                     </MenuItemStyle>
                     <MenuItemStyle onClick={handleClose}>
                        <Language />
                        Сменить язык
                     </MenuItemStyle>
                  </MenuStyle>
               </div>
            ) : (
               <ContainerBlock>
                  {isAuth ? (
                     <>
                        <Block onClick={() => handleNavigationPage('messages')}>
                           <IconButton>
                              <MessageIcon />
                           </IconButton>
                           <a>Сообщения</a>
                        </Block>
                        <Block onClick={() => handleNavigationPage('favorite')}>
                           <IconButton>
                              <HeartLike />
                           </IconButton>
                           <a>Избранное</a>
                        </Block>
                        <Block onClick={() => handleNavigationPage('profile')}>
                           <IconButton>
                              <UserLogo />
                           </IconButton>
                           <UserName>{userData.name}</UserName>
                        </Block>
                     </>
                  ) : null}
                  <Block>
                     <div>{renderFlag(language)}</div>
                     <SelectStyle
                        options={languages}
                        value={language}
                        onChange={handleSelect}
                     />
                  </Block>
                  {isAuth ? (
                     <ButtonStyle
                        onClick={() => handleNavigationPage('create-ad')}
                     >
                        <Plus />
                        Опубликовать
                     </ButtonStyle>
                  ) : (
                     <ButtonStyle onClick={handleOpenModal}>Войти</ButtonStyle>
                  )}
               </ContainerBlock>
            )}
         </Wrapper>
         <SignIn
            open={openModal}
            onClose={handleCloseModal}
            onOpen={handleOpenModal}
         />
      </>
   );
};

const Wrapper = styled('header')(({ theme }) => ({
   height: '84px',
   background: '#ffffff',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'space-between',
   padding: '14px 60px',
   svg: { cursor: 'pointer' },
   [theme.breakpoints.down('md')]: { padding: '16px', height: '59px' },
}));

const Block = styled('div')(() => ({
   display: 'flex',
   alignItems: 'center',
   gap: '10px',
   cursor: 'pointer',
   transition: '200ms',

   '&:hover': {
      color: '#9774FF',

      path: {
         transition: '200ms',
         stroke: '#9774FF',
      },
   },

   '&:active': {
      color: '#5C24FF',

      path: {
         stroke: '#5C24FF',
      },
   },
}));

const UserName = styled(Typography)(() => ({
   maxidth: '150px',
   overflow: 'hidden',
   textOverflow: 'ellipsis',
   textWrap: 'nowrap',
}));

const ContainerBlock = styled('div')(() => ({
   display: 'flex',
   alignItems: 'center',
   gap: '32px',
}));

const LogoStyle = styled('div')(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
   gap: '10px',
   svg: { [theme.breakpoints.down('md')]: { width: '134px', height: '29px' } },
}));

const ButtonStyle = styled(Button)(() => ({
   display: 'flex',
   justifyContent: 'center',
   gap: '4px',
   fontWeight: '500',
   textTransform: 'inherit',
   height: '36px',
}));

const SelectStyle = styled(ReusableSelect)(() => ({
   '.MuiOutlinedInput-notchedOutline': { border: 'none' },
   '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none' },
   '&.Mui-focused .MuiOutlinedInput-notchedOutline': { border: 'none' },
   '.MuiSelect-icon': { right: '5px', top: '15px' },
   '.MuiSelect-select': { paddingLeft: '0px' },
}));

const MenuStyle = styled(Menu)(() => ({
   '.MuiPaper-root': {
      padding: '16px 0px',
      width: '230px',
      background: '#7e52ff',
   },
}));

const MenuItemStyle = styled(MenuItem)(() => ({
   display: 'flex',
   gap: '10px',
   paddingLeft: '40px',
   color: '#fff',
   fontWeight: '600',

   svg: {
      path: {
         stroke: '#fff',
      },
   },

   '&:hover': {
      backgroundColor: '#fff',
      color: '#7e52ff',
      borderTopRightRadius: '8px',
      borderBottomRightRadius: '8px',
      marginRight: '16px',
      '& svg path': { stroke: '#7e51ff' },
   },
}));

const Line = styled('div')(() => ({
   width: '100%',
   borderBottom: '1px solid #b2b2b2',
   margin: '16px 0px',
}));
