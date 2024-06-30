import Ulutman from '../assets/icons/ulutman-icon.svg?react';
import HeartLike from '../assets/icons/white-heart.svg?react';
import UserLogo from '../assets/icons/user.svg?react';
import RussianFlag from '../assets/icons/russian-flag.svg?react';
import Plus from '../assets/icons/plus.svg?react';
import Menu from '../assets/icons/menu-icon.svg?react';
import PlusButton from '../assets/icons/plus-button-icon.svg?react';
import UlutmanLogo from '../assets/icons/ulutman-logo-icon.svg?react';
import MessageIcon from '../assets/icons/message-icon.svg?react';
import { styled, useMediaQuery } from '@mui/material';
import { IconButton } from '../components/IconButton';
import { Button } from '../components/UI/Button';
import ReusableSelect from '../components/UI/Select';
import { languages } from '../utils/constants/languages';
import { useState } from 'react';

const renderFlag = language =>
   language === 'Кыргызский' ? (
      <UserLogo />
   ) : language === 'Русский' ? (
      <RussianFlag />
   ) : language === 'Турецкий' ? (
      <TurkishFlag />
   ) : language === 'Узбекский' ? (
      <UzbekFlag />
   ) : language === 'Английский' ? (
      <EnglishFlag />
   ) : (
      <RussianFlag />
   );

export const Header = () => {
   const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'));
   const [language, setLanguage] = useState('Русский');

   const handleSelect = event => {
      setLanguage(event.target.value);
   };
   return (
      <Wrapper>
         <LogoStyle>{isMobile ? <Ulutman /> : <UlutmanLogo />}</LogoStyle>
         {isMobile ? (
            <div>
               <IconButton>
                  <HeartLike />
               </IconButton>
               <IconButton>
                  <PlusButton />
               </IconButton>
               <IconButton>
                  <Menu />
               </IconButton>
            </div>
         ) : (
            <>
               <ContainerBlock>
                  <Block>
                     <IconButton>
                        <MessageIcon />
                     </IconButton>
                     <a>Сообщения</a>
                  </Block>
                  <Block>
                     <IconButton>
                        <HeartLike />
                     </IconButton>
                     <a>Избранное</a>
                  </Block>
                  <Block>
                     <IconButton>
                        <UserLogo />
                     </IconButton>
                     <a>Профиль</a>
                  </Block>
                  <Block>
                     <div style={{ paddingTop: '10px' }}>
                        {renderFlag(language)}
                     </div>
                     <SelectStyle
                        options={languages}
                        value={language}
                        onChange={handleSelect}
                     />
                  </Block>
                  <ButtonStyle>
                     <Plus />
                     Опубликовать
                  </ButtonStyle>
               </ContainerBlock>
            </>
         )}
      </Wrapper>
   );
};

const Wrapper = styled('header')(({ theme }) => ({
   height: '84px',
   background: '#ffffff',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'space-between',
   padding: '14px 60px',
   svg: {
      cursor: 'pointer',
   },

   [theme.breakpoints.down('md')]: {
      padding: '16px',
      height: '59px',
   },
}));

const Block = styled('div')(() => ({
   display: 'flex',
   alignItems: 'center',
   a: {
      fontWeight: '400',
      cursor: 'pointer',
   },
}));

const ContainerBlock = styled('div')(() => ({
   display: 'flex',
   alignItems: 'center',
   gap: '32px',
}));
const LogoStyle = styled('div')(() => ({
   display: 'flex',
   alignItems: 'center',
   gap: '10px',
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
