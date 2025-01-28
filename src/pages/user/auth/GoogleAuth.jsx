import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { styled } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import GoogleIcon from '../../../assets/icons/google-icon.svg?react'
import { Button } from '../../../components/UI/Button'
import { googleAuth } from '../../../redux/auth/authThunk'
import { autoLogin } from '../../../redux/auth/authSlice'
import { showToast } from '../../../hooks/useToast'

const GoogleAuth = ({ onClose }) => {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const { t } = useTranslation()
   const { isLoading } = useSelector(state => state.auth)

   const handleGoogleLogin = async () => {
      try {
         await dispatch(googleAuth())
            .unwrap()
            .then(() => {
               onClose()
               navigate('/')
            })
         showToast('succes', t('signIn.googleAuth.success'))
      } catch (error) {
         console.error(error)
      }
   }

   useEffect(() => {
      const storedData = JSON.parse(localStorage.getItem('ULUTMAN'))
      if (storedData?.token) {
         dispatch(autoLogin(storedData))
      }
   }, [dispatch])

   return (
      <StyledButton
         type="button"
         onClick={handleGoogleLogin}
         disabled={isLoading}
         fullWidth
      >
         <GoogleIcon />
         {isLoading ? t('signIn.googleAuth.btn1') : t('signIn.googleAuth.btn2')}
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
