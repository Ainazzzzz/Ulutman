import { useDispatch, useSelector } from 'react-redux'
import { styled } from '@mui/material'

import GoogleIcon from '../../../assets/icons/google-icon.svg?react'
import { Button } from '../../../components/UI/Button'
import { googleAuth } from '../../../redux/auth/authThunk'

const GoogleAuth = () => {
   const dispatch = useDispatch()
   const { isLoading } = useSelector(state => state.auth)

   const handleGoogleLogin = () => {
      dispatch(googleAuth())
   }

   return (
      <StyledButton
         type={'button'}
         onClick={handleGoogleLogin}
         disabled={isLoading}
      >
         <GoogleIcon />{' '}
         {isLoading ? 'Авторизация...' : 'Войти с помощью Google'}
      </StyledButton>
   )
}

export default GoogleAuth

const StyledButton = styled(Button)({
   display: 'flex',
   justifyContent: 'flex-start',
   gap: '20px',

   borderRadius: '20px',
   background: 'transparent',
   border: '1px solid #CFCFCF',
   fontSize: '16px',
   fontWeight: '500',
   color: '#282828',
   boxShadow: 'none',
   padding: '5px 16px 5px 20px',

   '&:hover': {
      color: '#fff',
      border: '1px solid transparent',
   },
})
