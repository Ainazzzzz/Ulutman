import { NavLink, Outlet } from 'react-router-dom'
import { styled } from '@mui/material'
import { PATHS } from '../../utils/constants/paths'
import ArrowIcon from '../../assets/icons/arrowpurpul.svg?react'

export const MyPage = () => {
   return (
      <Container>
         <StyledNav>
            <StyledNavLink
               to={PATHS.USER.PROFILE}
               className={({ isActive }) => (isActive ? 'active' : '')}
            >
               Профиль
            </StyledNavLink>
            <StyledNavLink
               to={PATHS.USER.MY_ADS}
               className={({ isActive }) => (isActive ? 'active' : '')}
            >
               Мои объявления
            </StyledNavLink>
            <StyledNavLinkLast
               to="/user"
               style={{ marginLeft: 'auto', color: '#7b5bd1' }}
            >
               <ArrowIcon /> Назад
            </StyledNavLinkLast>
         </StyledNav>
         <Outlet />
      </Container>
   )
}

const Container = styled('div')(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '40px',
   padding: '40px 57px',

   [theme.breakpoints.down('md')]: {
      padding: '40px 16px',
      gap: '30px',
   },
}))

const StyledNav = styled('nav')({
   display: 'flex',
   gap: '20px',
   alignItems: 'center',
   backgroundColor: '#f5f5f8',
})

const StyledNavLink = styled(NavLink)({
   color: '#282828',
   textDecoration: 'none',
   fontWeight: '500',
   fontSize: '20px',

   '&.active': {
      color: '#7E52FF',
      textDecoration: 'underline',
      textUnderlineOffset: '2px',
   },
})

const StyledNavLinkLast = styled(NavLink)({
   textDecoration: 'none',
   fontWeight: '400',
   fontSize: '16px',
   color: '#7E52FF',

   display: 'flex',
   alignItems: 'center',
})
