import React from 'react'
import { styled } from '@mui/material'
import Modal from './Modal'
import { useTranslation } from 'react-i18next'

export const PhoneModal = ({ handleClose, open, phoneNumber }) => {
   const { t } = useTranslation()
   return (
      <Modal open={open} handleClose={handleClose} variant="phone">
         <Block>
            <p>{t('user.modal.phone')}</p>
            <span>{phoneNumber}</span>
         </Block>
      </Modal>
   )
}

const Block = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   gap: '24px',
   p: {
      fontFamily: 'Inter',
      fontSize: '20px',
      fontWeight: '400',
      color: '#202020',
   },
   span: {
      fontFamily: 'Inter',
      fontSize: '24px',
      fontWeight: '500',
      color: '#282828',
   },
}))
