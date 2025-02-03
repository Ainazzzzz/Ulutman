import { NavLink, Outlet } from 'react-router-dom'
import { styled } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { PATHS } from '../../utils/constants/paths'
import ArrowIcon from '../../assets/icons/arrowpurpul.svg?react'

export const MyPage = () => {
   const { t } = useTranslation()
   return (
      <Container>
         <StyledNav>
            <StyledNavLink
               to={PATHS.USER.PROFILE}
               className={({ isActive }) => (isActive ? 'active' : '')}
            >
               {t('user.myPage.profile')}
            </StyledNavLink>
            <StyledNavLink
               to={PATHS.USER.MY_ADS}
               className={({ isActive }) => (isActive ? 'active' : '')}
            >
               {t('user.myPage.myAds')}
            </StyledNavLink>
            <StyledNavLinkLast
               to="/user"
               style={{ marginLeft: 'auto', color: '#7b5bd1' }}
            >
               <ArrowIcon /> {t('user.myPage.back')}
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
      padding: '20px 10px',
      gap: '20px',
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
