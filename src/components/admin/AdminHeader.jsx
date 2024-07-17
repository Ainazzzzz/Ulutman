import React, { useState } from 'react';
import Search from '../../assets/icons/searchgrey.svg?react';
import { InputBase, MenuItem, styled, useMediaQuery } from '@mui/material';
import Frame from '../../assets/icons/frame.svg?react';
import RussianFlag from '../../assets/icons/russian-flag.svg?react';
import User from '../../assets/icons/userprofile.svg?react';
import KgFlag from '../../assets/icons/kg.svg?react';
import UzFlag from '../../assets/icons/uz.svg?react';
import UsaFlag from '../../assets/icons/usa.svg?react';
import TjFlag from '../../assets/icons/tj.svg?react';
import ReusableSelect from '../UI/Select';
import UlutmanLogo from '../../assets/icons/ulutman-logo-icon.svg?react';
import MenuAdmin from '../../assets/icons/menu-icon.svg?react';
import { languages } from '../../utils/constants/languages';
import GoOut from '../../assets/icons/goout.svg?react';
import Users from '../../assets/icons/usersicon.svg?react';
import Announcement from '../../assets/icons/announcement.svg?react';
import Category from '../../assets/icons/category.svg?react';
import Modearation from '../../assets/icons/moderation.svg?react';
import Language from '../../assets/icons/language-icon.svg?react';
import { IconButton } from '../IconButton';
import Menu from '@mui/material/Menu';

const renderFlag = language => {
   switch (language) {
      case 'Кыргызский':
         return <KgFlag />;
      case 'Русский':
         return <RussianFlag />;
      case 'Таджикский':
         return <TjFlag />;
      case 'Узбекский':
         return <UzFlag />;
      case 'Английский':
         return <UsaFlag />;
      default:
         return <RussianFlag />;
   }
};

const AdminHeader = () => {
   const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'));
   const [language, setLanguage] = useState('Русский');
   const [openMenu, setOpenMenu] = useState(null);

   const handleSelect = event => {
      setLanguage(event.target.value);
   };
   const handleClose = () => {
      setOpenMenu(null);
   };
   const handleClick = event => {
      setOpenMenu(event.currentTarget);
   };

   return (
      <WrapperAdminHeader>
         <LogoMobile>
            <UlutmanLogoStyle />
         </LogoMobile>
         {isMobile ? (
            <div>
               <MobileSearch>
                  <Search />
                  <IconButton onClick={handleClick}>
                     <MenuAdmin />
                  </IconButton>
               </MobileSearch>
               <MenuStyle
                  anchorEl={openMenu}
                  open={Boolean(openMenu)}
                  onClose={handleClose}
               >
                  <MenuItemStyle onClick={handleClose}>
                     <GoOut /> Выйти
                  </MenuItemStyle>
                  <Line></Line>
                  <MenuItemStyle onClick={handleClose}>
                     <Users />
                     Пользователи
                  </MenuItemStyle>
                  <MenuItemStyle onClick={handleClose}>
                     <Announcement /> Объявления
                  </MenuItemStyle>
                  <MenuItemStyle onClick={handleClose}>
                     <Category />
                     Категории
                  </MenuItemStyle>
                  <MenuItemStyle onClick={handleClose}>
                     <Modearation />
                     Модерация
                  </MenuItemStyle>
                  <MenuItemStyle onClick={handleClose}>
                     <Language />
                     Сменить язык
                  </MenuItemStyle>
               </MenuStyle>
            </div>
         ) : (
            <SehondBigContainer>
               <InputStyle>
                  <SearchIconStyle>
                     <SearchIcon />
                  </SearchIconStyle>
                  <InputBase placeholder="Поиск" />
               </InputStyle>

               <MiddleContainerBox>
                  <FrameStyle>
                     <Frame />
                  </FrameStyle>
                  <FlagLanguageStyle>
                     <div style={{ paddingTop: '14px' }}>
                        {renderFlag(language)}
                     </div>
                     <SelectStyle
                        options={languages}
                        value={language}
                        onChange={handleSelect}
                     />
                  </FlagLanguageStyle>
                  <ContainerProfileTitle>
                     <ProfileLogo>
                        <User />
                     </ProfileLogo>
                     <TitleAdmin>Tezekbaev </TitleAdmin>
                     <SelectStyle />
                  </ContainerProfileTitle>
               </MiddleContainerBox>
            </SehondBigContainer>
         )}
      </WrapperAdminHeader>
   );
};

export default AdminHeader;

const WrapperAdminHeader = styled('div')(({ theme }) => ({
   background: 'rgb(255, 255, 255);',
   width: '100%',
   height: '70px',
   display: 'flex',
   justifyContent: 'space-around',
   cursor: 'pointer',
   paddingTop: '17px',
   [theme.breakpoints.down('md')]: {
      height: '60px',
      justifyContent: 'center',
      paddingTop: '10px',
   },
}));
const SehondBigContainer = styled('div')(() => ({
   display: 'flex',
   gap: '351px',
}));
const MobileSearch = styled('div')(({ theme }) => ({
   display: 'flex',
   gap: '27px',
   [theme.breakpoints.down('md')]: {
      paddingLeft: '110px',
   },
}));

const UlutmanLogoStyle = styled(UlutmanLogo)(({ theme }) => ({
   width: '134px',
   height: '29px',

   [theme.breakpoints.down('md')]: {
      width: '134px',
      height: '29px',
   },
}));
const LogoMobile = styled('div')(({ theme }) => ({
   [theme.breakpoints.down('md')]: {
      display: 'flex',
   },
}));

const SearchIconStyle = styled('div')(() => ({
   padding: '6px  12px 12px 17px',
}));
const MiddleContainerBox = styled('div')(() => ({
   display: 'flex',
   gap: '20px',
   justifyContent: 'center',
   alignItems: 'center',
   paddingBottom: '10px',
}));
const InputStyle = styled('div')(() => ({
   width: '  388px',
   height: '38px',
   border: '0.6px solid rgb(213, 213, 213)',
   borderRadius: '19px',
   background: 'rgb(245, 246, 250);',
   color: 'rgb(32, 34, 36)',
   fontFamily: 'Nunito Sans',
   fontSize: '14px',
   fontWeight: '400',
   lineHeight: '19px',
   display: 'flex',
}));

const SearchIcon = styled(Search)(() => ({
   width: '19px',
   height: '19px',
}));
const SelectStyle = styled(ReusableSelect)(() => ({
   '.MuiOutlinedInput-notchedOutline': {
      border: 'none',
   },
   '&:hover .MuiOutlinedInput-notchedOutline': {
      border: 'none',
   },
   '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      border: 'none',
   },

   '.MuiSelect-icon': {
      right: '5px',
      top: '15px',
   },
   '.MuiSelect-select': {
      paddingLeft: '0px',
   },
}));
const FlagLanguageStyle = styled('div')(({ theme }) => ({
   display: 'flex',
}));

const FrameStyle = styled('div')(({ theme }) => ({
   width: '20px',
   height: '20px',
}));
const ProfileLogo = styled('div')(() => ({
   width: '37px',
   height: '37px',
}));
const ContainerProfileTitle = styled('div')(({ theme }) => ({
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   gap: '6px',
}));
const TitleAdmin = styled('p')(() => ({
   color: 'rgb(40, 40, 40);',
   fontFamily: 'Inter',
   fontSize: '16px',
   fontWeight: '400',
   lineHeight: '19px',
}));
const MenuStyle = styled(Menu)(() => ({
   '.MuiPaper-root': {
      padding: '16px 0px 16px 0px',
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
   '&:hover': {
      backgroundColor: '#fff',
      color: '#7e52ff',
      borderTopRightRadius: '8px',
      borderBottomRightRadius: '8px',
      marginRight: '16px',
      '& svg path': {
         stroke: '#7e51ff',
      },
   },
}));
const UsersStyle = styled('div')(() => ({
   '&:hover': {
      backgroundColor: '#fff',
      color: '#7e52ff',
      borderTopRightRadius: '8px',
      borderBottomRightRadius: '8px',
      marginRight: '16px',
      '& svg path': {
         stroke: '#7e51ff',
      },
   },
}));
const Line = styled('div')(() => ({
   width: '100%',
   borderBottom: '1px solid #b2b2b2',
   margin: '16px 0px 16px 0px',
}));
