import { styled } from '@mui/material'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import Modal from '../UI/Modal'

export const DeleteMyAdsModal = ({ userId, selectedIds }) => {
   const [isOpen, setIsOpen] = useState(true)

   const errorMessage = useSelector(state => state.myAds.errorMessage)

   const handleDeleteSelectedAds = () => {
      if (selectedIds.length > 0) {
         // dispatch(deleteSelectedAds({ userId, selectedIds }))
      }
      setIsOpen(false)
   }

   const handleCloseModal = () => {
      setIsOpen(!isOpen)
   }

   return (
      <Modal open={isOpen} handleClose={handleCloseModal} variant="delete">
         <Container>
            <Title>Вы уверены, что хотите удалить?</Title>
            {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
            <div>
               <FirstButton onClick={handleCloseModal}>Отменить</FirstButton>

               <SecondButton onClick={handleDeleteSelectedAds}>
                  Удалить
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

const ErrorText = styled('div')({
   marginTop: '10px',
   color: 'red',
   fontSize: '14px',
   textAlign: 'center',
})
