import React from 'react'
import { styled } from '@mui/material'
import { useTranslation } from 'react-i18next'
import Modal from '../../UI/Modal'

const DetailInfoModal = ({ open, onClose }) => {
   const { t } = useTranslation()

   const fields = [
      { label: t('user.createAds.newCreateAdForm.detailInfo.room') },
      { label: t('user.createAds.newCreateAdForm.detailInfo.area') },
      { label: t('user.createAds.newCreateAdForm.detailInfo.totalArea') },
      { label: t('user.createAds.newCreateAdForm.detailInfo.year') },
      { label: t('user.createAds.newCreateAdForm.detailInfo.repair') },
      { label: t('user.createAds.newCreateAdForm.detailInfo.heating') },
      { label: t('user.createAds.newCreateAdForm.detailInfo.document') },
      { label: t('user.createAds.newCreateAdForm.detailInfo.company') },
   ]

   return (
      <Modal open={open} handleClose={onClose}>
         <ModalContent>
            <Title>
               {t('user.createAds.newCreateAdForm.detailInfo.title')}
            </Title>

            <FieldsContainer>
               {fields.map(field => (
                  <Fields key={field.label}>{field.label}</Fields>
               ))}
            </FieldsContainer>
         </ModalContent>
      </Modal>
   )
}

export default DetailInfoModal

const ModalContent = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
}))

const Title = styled('h3')(() => ({
   fontSize: '20px',
   lineHeight: '24px',
   margin: '0 0 30px 0',
}))

const FieldsContainer = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   flexDirection: 'column',
   gap: '16px',
}))

const Fields = styled('div')(() => ({
   width: '327px',
   fontSize: '18px',
   lineHeight: '21px',
   color: '#909090',
   border: '1px solid #cfcfcf',
   borderRadius: '10px',
   padding: '10px 20px',
   textAlign: 'center',

   cursor: 'pointer',
   transition: '250ms',

   ':hover': {
      backgroundColor: '#7e52ff',
      color: '#fff',
   },
}))
