import { useState } from 'react'
import { styled } from '@mui/material'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Modal from '../../components/UI/Modal'
import CloseIcon from '../../assets/icons/cross-icon.svg?react'
import UserLogo from '../../assets/icons/email-logo-icon.svg?react'
import NextIcon from '../../assets/icons/next-violet-icon.svg?react'
import { Button } from '../../components/UI/Button'

export const AccountSelection = () => {
   const [isOpen, setIsOpen] = useState(true)
   const [anchorEl, setAnchorEl] = useState(null)
   const [selectedEmail, setSelectedEmail] = useState('Jaka-imanaliev@mail.ru')

   const open = Boolean(anchorEl)

   const handleClick = event => {
      setAnchorEl(event.currentTarget)
   }

   const handleClose = () => {
      setAnchorEl(null)
   }

   const handleMenuItemClick = email => {
      setSelectedEmail(email)
      handleClose()
   }

   const handleCloseModal = () => setIsOpen(!isOpen)
   return (
      <Modal open={isOpen} onClose={handleClose}>
         <IconStyle>
            <CloseIcon onClick={handleCloseModal} />
         </IconStyle>
         <Box>
            <h2>Выберите аккаунт</h2>
            <Container>
               <Block>
                  <div>
                     <UserLogo />
                     <p>{selectedEmail}</p>
                  </div>
                  <NextIcon onClick={handleClick} />
               </Block>
               <Button>Войти в другой аккаунт</Button>
            </Container>

            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
               <MenuItem
                  onClick={() => handleMenuItemClick('Jaka-imanaliev@mail.ru')}
               >
                  Jaka-imanaliev@mail.ru
               </MenuItem>
               <MenuItem
                  onClick={() => handleMenuItemClick('Jaka-email@mail.ru')}
               >
                  Jaka-email@mail.ru
               </MenuItem>
            </Menu>
         </Box>
      </Modal>
   )
}

const IconStyle = styled('div')(() => ({
   svg: {
      position: 'absolute',
      top: '26px',
      right: '26px',
      cursor: 'pointer',
   },
}))
const Box = styled('div')(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '30px',
   h2: {
      fontWeight: '600',
      fontSize: '26px',
      textAlign: 'center',
      paddingTop: '50px',
      [theme.breakpoints.down('md')]: {
         fontSize: '24px',
      },
   },
}))

const Block = styled('div')(() => ({
   display: 'flex',
   alignItems: 'center',
   gap: '43px',

   div: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
   },
   svg: {
      cursor: 'pointer',
   },
   p: {
      fontWeight: '500',
      fontSize: '18px',
      width: '206px',
   },
}))
const Container = styled('div')(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '30px',
   [theme.breakpoints.down('md')]: {
      gap: '40px',
   },
}))
