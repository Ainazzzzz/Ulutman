import React, { useState } from 'react';
import Search from '../../assets/icons/searchgrey.svg?react';
import { InputBase, styled, useMediaQuery } from '@mui/material';
import Frame from '../../assets/icons/frame.svg?react';
import RussianFlag from '../../assets/icons/russian-flag.svg?react';
import User from '../../assets/icons/userprofile.svg?react';
import KgFlag from '../../assets/icons/kg.svg?react';
import UzFlag from '../../assets/icons/uz.svg?react';
import UsaFlag from '../../assets/icons/usa.svg?react';
import TjFlag from '../../assets/icons/tj.svg?react';
import ReusableSelect from '../UI/Select';
import UlutmanLogo from '../../assets/icons/ulutman-logo-icon.svg?react';
import Menu from '../../assets/icons/menu-icon.svg?react';
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

const AdminHeader = ({ languages }) => {
   const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'));
   const [language, setLanguage] = useState('Русский');

   const handleSelect = event => {
      setLanguage(event.target.value);
   };

   return (
      <WrapperAdminHeader>
         <LogoMobile>
            <UlutmanLogoStyle />
         </LogoMobile>
         {isMobile ? (
            <MobileSearch>
               <Search />
               <Menu />
            </MobileSearch>
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
const InputStyle = styled('div')(({ theme }) => ({
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
