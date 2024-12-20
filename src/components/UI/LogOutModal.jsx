import React from 'react'
import { styled } from '@mui/material'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Modal from './Modal'
import { Button } from './Button'
import { logOut } from '../../redux/auth/authThunk'

const LogOutModal = ({ open, onClose }) => {
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const handleLogout = () => {
      dispatch(logOut({ navigate, toggleModal: onClose }))
   }

   return (
      <Modal open={open} handleClose={onClose}>
         <Container>
            <p>Вы действительно хотите выйти?</p>

            <div>
               <Button onClick={handleLogout}>Да</Button>
               <Button variant="" onClick={onClose}>
                  Нет
               </Button>
            </div>
         </Container>
      </Modal>
   )
}

export default LogOutModal

const Container = styled('div')(() => ({
   textAlign: 'center',

   p: {
      margin: '0 0 20px 0',
   },

   div: {
      display: 'flex',
      gap: '20px',
      justifyContent: 'center',
   },
}))
