import { NavLink } from 'react-router-dom';
import Ulutman from '../assets/icons/ulutman.svg?react';
import HeartLike from '../assets/icons/white-heart.svg?react';
import UserLogo from '../assets/icons/user.svg?react';
import RussianFlag from '../assets/icons/russian-flag.svg?react';
import { styled } from '@mui/material';
export const Header = () => {
   return (
      <Wrapper>
         <Ulutman />
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
         </ContainerBlock>
      </Wrapper>
   );
};
const Wrapper = styled('div')(() => ({
   heigh: '84px',
   background: 'gray',
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
