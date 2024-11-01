import { NavLink, Outlet } from 'react-router-dom';
import { styled } from '@mui/material';

const StyledNav = styled('nav')({
   display: 'flex',
   gap: '20px',
   alignItems: 'center',
   backgroundColor: '#f5f5f8',
});

const StyledNavLink = styled(NavLink)({
   color: 'black',
   textDecoration: 'none',
   fontWeight: '500',
   fontSize: '16px',

   '& .active-page': {
      color: '#7b5bd1',
      textDecoration: 'underline',
      textUnderlineOffset: '4px',
   },
});

export const MyPage = () => {
   return (
      <Container>
         <StyledNav>
            <StyledNavLink
               to="/user/my-page/profile"
               className={({ isActive }) => {
                  isActive ? 'active-page' : '';
               }}
            >
               Профиль
            </StyledNavLink>
            <StyledNavLink
               className={({ isActive }) => {
                  isActive ? 'active-page' : '';
               }}
               to="/user/my-page/favorites"
            >
               Избранное
            </StyledNavLink>
            <StyledNavLink
               className={({ isActive }) => {
                  isActive ? 'active-page' : '';
               }}
               to="/messages"
            >
               Сообщения
            </StyledNavLink>
            <StyledNavLink
               className={({ isActive }) => {
                  isActive ? 'active-page' : '';
               }}
               to="/my-ads"
            >
               Мои объявления
            </StyledNavLink>
            <StyledNavLink
               to="/"
               style={{ marginLeft: 'auto', color: '#7b5bd1' }}
            >
               &larr; Назад
            </StyledNavLink>
         </StyledNav>
         <Outlet />
      </Container>
   );
};

const Container = styled('div')(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '40px',
   padding: '40px 57px',

   [theme.breakpoints.down('md')]: {
      padding: '40px 16px',
      gap: '30px',
   },
}));
