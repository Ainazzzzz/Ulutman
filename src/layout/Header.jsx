import { NavLink } from 'react-router-dom';
import Ulutman from '../assets/icons/ulutman.svg?react';
import HeartLike from '../assets/icons/white-heart.svg?react';
import UserLogo from '../assets/icons/user.svg?react';
import RussianFlag from '../assets/icons/russian-flag.svg?react';
import Plus from '../assets/icons/plus.svg?react';
import { styled } from '@mui/material';
import { IconButton } from '../components/IconButton';
import { Button } from '../components/UI/Button';
export const Header = () => {
   return (
      <Wrapper>
         {/* <IconButton> */}
         <Ulutman />
         {/* </IconButton> */}
         <ContainerBlock>
            <Block>
               <HeartLike />
               <a to="/">Избранное</a>
            </Block>
            <Block>
               <UserLogo />
               <a to="/">Профиль</a>
            </Block>
            <Block>
               <RussianFlag
                  style={{ paddingTop: '6px', paddingLeft: '10px' }}
               />
               <a to="/">Русский</a>
            </Block>
            <ButtonStyle>
               {' '}
               <Plus />
               Опубликовать
            </ButtonStyle>
         </ContainerBlock>
      </Wrapper>
   );
};
const Wrapper = styled('div')(() => ({
   heigh: '84px',
   background: '#FFF',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'space-between',
   padding: '14px 60px ',
   svg: {
      cursor: 'pointer',
   },
}));
const Block = styled('div')(() => ({
   a: {
      fontWeight: '400',
      cursor: 'pointer',
   },
   display: 'flex',
   gap: '2px',
   alignItems: 'center',
}));
const ContainerBlock = styled('div')(() => ({
   display: 'flex',
   gap: '32px',
}));
const ButtonStyle = styled(Button)(() => ({
   display: 'flex',
   gap: '4px',
   fontWeight: '500',
   textTransform: 'inherit',
   height: '36px',
}));
