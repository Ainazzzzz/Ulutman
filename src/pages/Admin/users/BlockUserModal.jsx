/* eslint-disable no-nested-ternary */
import React from 'react'
import { styled } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import Modal from '../../../components/UI/Modal'
import { Button } from '../../../components/UI/Button'
import { blockUserRequest } from '../../../redux/users/usersThunk'
import Spinner from '../../../components/UI/Spinner'

const BlockUserModal = ({ onClose, isOpen, userData }) => {
   const dispatch = useDispatch()
   const { isLoading } = useSelector(state => state.users)

   const isBlock = {
      ЗАБЛОКИРОВАН: false,
      АКТИВНЫЙ: true,
   }

   const blockUser = () => {
      dispatch(
         blockUserRequest({
            userId: userData.id,
            newStatus: isBlock[userData.status] ? 'ЗАБЛОКИРОВАН' : 'АКТИВНЫЙ',
            onClose,
         }),
      )
   }

   return (
      <Modal open={isOpen} handleClose={onClose} variant="info">
         <Container>
            <Title>Вы уверены, что хотите изменить?</Title>
            <div>
               <FirstButton onClick={blockUser} disabled={isLoading}>
                  {isLoading ? (
                     <Spinner />
                  ) : isBlock[userData?.status] ? (
                     'Заблокировать'
                  ) : (
                     'Разблокировать'
                  )}
               </FirstButton>
               <SecondButton onClick={onClose}>Отклонить</SecondButton>
            </div>
         </Container>
      </Modal>
   )
}

export default BlockUserModal

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
const FirstButton = styled(Button)(() => ({
   fontWeight: '500',
   fontSize: '17px',
   color: '#fff',
   borderRadius: '8px',
   border: 'none',
   background: '#5eb00e',
   cursor: 'pointer',

   '&:hover': {
      background: '#4a910b',
   },

   '&:active': {
      background: '#367608 !important',
   },
}))
const SecondButton = styled(Button)(() => ({
   fontWeight: '500',
   fontSize: '17px',
   color: '#fff',
   borderRadius: '8px',
   border: 'none',
   background: '#f00',
   cursor: 'pointer',

   '&:hover': {
      background: '#cc0000',
   },

   '&:active': {
      background: '#990000 !important',
   },
}))
