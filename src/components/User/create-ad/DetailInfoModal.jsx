import React from 'react'
import Modal from '../../UI/Modal'
import { styled } from '@mui/material'

const fields = [
   { label: 'Количество комнат' },
   { label: 'Площадь кухни' },
   { label: 'Общая площадь (кв.м)' },
   { label: 'Год постройки' },
   { label: 'Ремонт' },
   { label: 'Отопление' },
   { label: 'Права устанавливающие документы' },
   { label: 'Строительная компания' },
]

const DetailInfoModal = ({ open, onClose, setDetailInfo }) => {
   return (
      <Modal open={open} handleClose={onClose}>
         <ModalContent>
            <Title>Детальная информация</Title>

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
