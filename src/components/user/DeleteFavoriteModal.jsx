import { styled } from '@mui/material'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Modal from '../UI/Modal'

export const DeleteFavoriteModal = ({ onDelete }) => {
   const [isOpen, setIsOpen] = useState(true)
   const { t } = useTranslation()

   const onClose = () => setIsOpen(!isOpen)

   return (
      <Modal open={isOpen} handleClose={onClose} variant="delete">
         <Container>
            <Title>{t('user.modal.title')}</Title>
            <div>
               <FirstButton onClick={onClose}>
                  {t('user.modal.cancelBtn')}
               </FirstButton>
               <SecondButton onClick={onDelete}>
                  {t('user.modal.deleteBtn')}
               </SecondButton>
            </div>
         </Container>
      </Modal>
   )
}

const Container = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '35px',
   div: {
      justifyContent: 'center',
      display: 'flex',
      gap: '40px',
   },
}))

const Title = styled('p')(({ theme }) => ({
   fontWeight: '500',
   fontSize: '17px',
   color: '#202020',
   textAlign: 'center',

   [theme.breakpoints.down('md')]: {
      fontSize: '16px',
   },
}))
const FirstButton = styled('button')(() => ({
   fontWeight: '500',
   fontSize: '17px',
   color: '#282828',
   width: '120px',
   height: '46px',
   borderRadius: '8px',
   border: '1px solid #282828',
   background: 'transparent',
   cursor: 'pointer',
}))
const SecondButton = styled('button')(() => ({
   fontWeight: '500',
   fontSize: '17px',
   color: '#ff0000',
   width: '120px',
   height: '46px',
   borderRadius: '8px',
   border: '1px solid #ff0000',
   background: 'transparent',
   cursor: 'pointer',
}))
