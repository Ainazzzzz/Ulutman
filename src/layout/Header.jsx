import { NavLink } from 'react-router-dom';
import Ulutman from '../assets/icons/ulutman.svg?react';
import HeartLike from '../assets/icons/white-heart.svg?react';
import UserLogo from '../assets/icons/user.svg?react';
import RussianFlag from '../assets/icons/russian-flag.svg?react';
export const Header = () => {
   return (
      <Wrapper>
         <Ulutman />
         <div>
            <HeartLike />
            <a to="/">Избранное</a>
         </div>
         <div>
            <UserLogo />
            <a to="/">Профиль</a>
         </div>
         <div>
            <RussianFlag />
            <a to="/">Русский</a>
         </div>
      </Wrapper>
   );
};
const Wrapper = styled('div')(() => ({
   display: 'flex',
}));
