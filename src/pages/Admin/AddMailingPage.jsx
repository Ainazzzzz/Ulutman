/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { styled, useMediaQuery } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { MailingForm } from './mailing/MailingForm'
import PrevIcon from '../../assets/icons/prev-icon.svg?react'

const AddMailingPage = () => {
   const navigate = useNavigate()

   const handlePrevious = () => {
      navigate('/admin')
   }

   const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'))

   return (
      <Container>
         <ContainerTitle>
            <Title>Форма для создания новой email-рассылки</Title>

            {isMobile && (
               <p onClick={handlePrevious}>
                  <PrevIcon /> Назад
               </p>
            )}
         </ContainerTitle>
         <MailingForm
            mailingType={[
               { value: 'НОВОСТИ', label: 'Новости', id: 'opt1' },
               { value: 'АКЦИИ', label: 'Акции', id: 'opt2' },
               {
                  value: 'ПОЗДРАВЛЕНИЯ',
                  label: 'Поздравления',
                  id: 'opt3',
               },
            ]}
            recipients={[
               {
                  value: 'Все пользователи',
                  label: 'Все пользователи',
                  id: 'opt4',
               },
               
            ]}
         />
      </Container>
   )
}

export default AddMailingPage

const Container = styled('div')(({ theme }) => ({
   padding: '40px 60px',

   [theme.breakpoints.down('md')]: {
      padding: '24px 16px',
   },
}))

const ContainerTitle = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   gap: '10px',

   p: {
      color: '#7E52FF',
      fontSize: '14px',
      fontWeight: '400',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
   },
}))

const Title = styled('h1')(({ theme }) => ({
   fontSize: '34px',
   fontWeight: '600',

   [theme.breakpoints.down('md')]: {
      fontSize: '22px',
   },
}))
