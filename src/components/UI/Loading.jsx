import { styled, useMediaQuery } from '@mui/material'
import { RingLoader } from 'react-spinners'

export const Loading = () => {
   const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'))
   return (
      <StyledLoader>
         <RingLoader size={isMobile ? 140 : 260} color="#064b84" />
      </StyledLoader>
   )
}

const StyledLoader = styled('div')({
   width: '100%',
   height: '100vh',
   backgroundColor: '#808080ab',
   position: 'fixed',
   top: 0,
   left: 0,
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   zIndex: 999,
})
