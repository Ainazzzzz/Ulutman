import React from 'react'
import { styled } from '@mui/material'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Modal from './Modal'
import { Button } from './Button'
import { logOut } from '../../redux/auth/authThunk'
import { useTranslation } from 'react-i18next'

const LogOutModal = ({ open, onClose }) => {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const { t } = useTranslation()

   const handleLogout = () => {
      dispatch(logOut({ navigate, toggleModal: onClose }))
   }

   return (
      <Modal open={open} handleClose={onClose}>
         <Container>
            <p>{t('user.logOut.title')}</p>

            <div>
               <Button onClick={handleLogout}>{t('user.logOut.logOut')}</Button>
               <Button variant="" onClick={onClose}>
                  {t('user.logOut.cancel')}
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
