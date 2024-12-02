import { styled } from '@mui/material'
import { chat } from '../../utils/constants/chat'

export const Chat = () => {
   return (
      <Box>
         {chat.map(chat => (
            <Wrapper key={chat.id}>
               <ImageStyle src={chat.img} alt="chat.img" />
               <Container>
                  <Description>{chat.description}</Description>
                  <Block>
                     <p>{chat.message}</p>
                     <span>{chat.date}</span>
                  </Block>
               </Container>
            </Wrapper>
         ))}
      </Box>
   )
}
const Box = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '20px',
}))
const Wrapper = styled('div')(({ theme }) => ({
   width: '611px',
   height: '74px',
   display: 'flex',
   gap: '14px',
   alignItems: 'center',
   cursor: 'pointer',

   transition: '250ms',

   ':hover': {
      backgroundColor: '#cacaca',
   },

   [theme.breakpoints.down('md')]: {
      width: '343px',
      height: '94px',
   },
}))
const Container = styled('div')(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '18px',
   [theme.breakpoints.down('md')]: {
      gap: '10px',
   },
}))
const Block = styled('div')(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      alignItems: 'start',
      gap: '10px',
   },
   p: {
      fontWeight: '400',
      color: '#282828',
   },
   span: {
      fontWeight: '500',
      color: '#909090',
      fontSize: '14px',
   },
}))

const ImageStyle = styled('img')(() => ({
   width: '74px',
   height: '74px',
   borderRadius: '10px',
}))

const Description = styled('p')(({ theme }) => ({
   fontWeight: '600',
   fontSize: '18px',
   color: '#000',
   [theme.breakpoints.down('md')]: {
      fontSize: '16px',
      width: '255px',
   },
}))
