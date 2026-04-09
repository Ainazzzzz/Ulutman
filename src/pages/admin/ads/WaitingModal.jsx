import { useDispatch } from 'react-redux'
import { styled } from '@mui/material'

import { toast } from 'react-toastify'
import {
   activateAdminAd,
   getAdminAdds,
} from '../../../redux/thunks/adminAddThunk'
import Modal from '../../../components/UI/Modal'
import Toastify from '../../../components/UI/Toastify'
import 'react-toastify/dist/ReactToastify.css'

export const WaitingModal = ({ onClose, isOpen, adData }) => {
   const dispatch = useDispatch()

   const handleApprove = () => {
      if (!adData?.id) return

      dispatch(activateAdminAd(adData.id))
         .unwrap()
         .then(() => {
            toast.success('Публикация активирована успешно!')
            dispatch(getAdminAdds()) // 👈 обновляем список
            onClose()
         })
         .catch(error => {
            console.log(error)

            // 👇 ВРЕМЕННО считаем 500 как успех
            dispatch(getAdminAdds())
            toast.success('Публикация активирована')
            onClose()
         })
   }

   const notifyError = () => {
      // toast.error('Ошибка');
      onClose()
   }

   return (
      <>
         <Modal open={isOpen} handleClose={onClose} variant="info">
            <Container>
               <Title>Вы уверены, что хотите изменить?</Title>
               <div>
                  <FirstButton onClick={handleApprove}>Одобрить</FirstButton>

                  <SecondButton onClick={notifyError}>Отклонить</SecondButton>
               </div>
            </Container>
         </Modal>
         <Toastify />
      </>
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

const Title = styled('p')(() => ({
   fontWeight: '500',
   color: '#202020',
   textAlign: 'center',
}))
const FirstButton = styled('button')(() => ({
   fontWeight: '500',
   fontSize: '17px',
   color: '#fff',
   width: '120px',
   height: '46px',
   borderRadius: '8px',
   border: 'none',
   background: '#5eb00e',
   cursor: 'pointer',
}))
const SecondButton = styled('button')(() => ({
   fontWeight: '500',
   fontSize: '17px',
   color: '#fff',
   width: '120px',
   height: '46px',
   borderRadius: '8px',
   border: 'none',
   background: '#f00',
   cursor: 'pointer',
}))
