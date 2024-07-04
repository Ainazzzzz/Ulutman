import { useState } from 'react';
import { styled, useMediaQuery } from '@mui/material';
import CategoryMenu from '../CategoryMenu';
import { SearchInputSelect } from '../UI/SearchInputSelect';
import ReusableSelect from '../UI/Select';

import banner from '../../assets/images/main.png';
import MobileBanner from '../../assets/images/mobile-banner.png';
import { categories, metroOptions } from '../../utils/constants/main';

export const MainBanner = () => {
   const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'));
   const mobile = useMediaQuery(theme => theme.breakpoints.down('sm'));
   const [selectValue, setSelectValue] = useState('select-metro');

   return (
      <MainContainer banner={mobile ? MobileBanner : banner}>
         <ContentWrapper>
            <Title>Реклама и Услуги для Вашего Бизнеса</Title>

            <InputWrapper>
               <div className="container-select">
                  <CategoryMenu />
                  {isMobile && (
                     <StyledSelect
                        options={metroOptions}
                        value={selectValue}
                        onChange={event => setSelectValue(event.target.value)}
                     />
                  )}
               </div>

               <SearchInputSelect
                  selectValue={selectValue}
                  options={metroOptions}
                  onSelectChange={event => setSelectValue(event.target.value)}
               />
            </InputWrapper>
         </ContentWrapper>

         <NavContainer>
            <NavList>
               {categories.map(({ Icon, title, background }) => (
                  <NavItem key={title}>
                     <a href="#">
                        <IconWrapper background={background}>
                           <Icon />
                        </IconWrapper>
                        <p>{title}</p>
                     </a>
                  </NavItem>
               ))}
            </NavList>
         </NavContainer>
      </MainContainer>
   );
};

const MainContainer = styled('div')(({ banner, theme }) => ({
   backgroundImage: `url(${banner})`,
   width: '100%',
   height: '80vh',
   backgroundPosition: 'center',
   backgroundSize: 'cover',
   backgroundRepeat: 'no-repeat',

   [theme.breakpoints.down('sm')]: {
      height: '100vh',
      backgroundSize: 'contain',
      backgroundPosition: 'top center',
   },
}));

const ContentWrapper = styled('article')(({ theme }) => ({
   width: '810px',
   height: '416px',
   margin: '0 auto',
   paddingTop: '84px',
   display: 'flex',
   flexDirection: 'column',
   gap: '54.5px',

   [theme.breakpoints.down('md')]: {
      width: '100%',
      height: 'fit-content',
      padding: '64px 24px 0 24px',
      gap: '24px',
   },
}));

const Title = styled('h1')(({ theme }) => ({
   fontSize: '72px',
   fontWeight: '700',
   color: '#fff',
   lineHeight: '105%',
   textAlign: 'center',
   [theme.breakpoints.down('md')]: {
      fontSize: '30px',
   },
}));

const InputWrapper = styled('section')(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-between',
   gap: '10px',
   [theme.breakpoints.down('md')]: {
      flexDirection: 'column-reverse',
      gap: '7px',
   },
   '& .container-select': {
      display: 'flex',
      alignItems: 'start',
      justifyContent: 'space-between',
      gap: '15px',
      '.css-tp4w1y-MuiFormControl-root': {
         gap: '0',
         width: '154px',
      },
      button: {
         display: 'flex',
         flexDirection: 'row-reverse',
         justifyContent: 'flex-end',
         [theme.breakpoints.down('md')]: {
            minWidth: '160px',
            maxHeight: '40px',
            minHeight: '40px',
            fontSize: '14px',
            paddingLeft: '6px',
         },
      },
   },
}));

const StyledSelect = styled(ReusableSelect)(() => ({
   maxWidth: '154px',
   ' .MuiInputBase-input': {
      fontSize: '14px',
      fontWeight: '400',
      background: 'white',
      borderRadius: '10px',
      padding: '7.5px',
      border: 'none',
   },
   '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
   },
   '&:hover .MuiOutlinedInput-notchedOutline': {
      border: 'none',
   },
   '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      border: 'none',
   },
}));

const NavContainer = styled('nav')(({ theme }) => ({
   display: 'flex',
   justifyContent: 'center',
   overflowX: 'auto',
   marginTop: '24px',

   '&::-webkit-scrollbar': {
      display: 'none',
   },
   [theme.breakpoints.down('md')]: {
      justifyContent: 'start',
   },
}));

const NavList = styled('ul')(({ theme }) => ({
   display: 'flex',
   gap: '20px',
   [theme.breakpoints.down('md')]: {
      gap: '0',
   },
}));

const NavItem = styled('li')(({ background, theme }) => ({
   minWidth: '100px',
   a: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '12px',
      textDecoration: 'none',
      color: '#fff',
      p: {
         fontSize: '18px',
         fontWeight: '600',
         [theme.breakpoints.down('md')]: {
            fontSize: '14px',
         },
      },
   },
}));

const IconWrapper = styled('div')(({ background, theme }) => ({
   width: '66px',
   height: '66px',
   background: background,
   borderRadius: '50%',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   [theme.breakpoints.down('md')]: {
      width: '54px',
      height: '54px',
   },
}));
