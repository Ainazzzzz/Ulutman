/* eslint-disable no-nested-ternary */
import { forwardRef } from 'react'
import { Dialog, Slide, styled } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import DeleteIcon from '../../assets/icons/trash.svg?react'
import InfoIcon from '../../assets/icons/info-warning.svg?react'
import PhoneIcon from '../../assets/icons/phone-green-icon.svg?react'
import PlusIcon from '../../assets/icons/plusIcon.svg?react'
import { Button } from './Button'
import { useTranslation } from 'react-i18next'

const Transition = forwardRef((props, ref) => (
   <Slide direction="up" ref={ref} {...props} />
))

const Modal = ({ children, variant = 'custom', handleClose, open }) => {
   const navigate = useNavigate()
   const { t } = useTranslation()

   const handleNavigationPage = path => {
      navigate(path)
      navigate(path)
      handleClose()
   }

   return (
      <StyledContainer
         open={open}
         TransitionComponent={Transition}
         keepMounted
         onClose={handleClose}
         variant={variant}
         aria-describedby="alert-dialog-slide-description"
      >
         {variant === 'custom' ? null : (
            <div className="close-button-container">
               <StyledCloseButton onClick={handleClose}>
                  {variant === 'delete' ? (
                     <DeleteIcon />
                  ) : variant === 'phone' ? (
                     <PhoneIcon />
                  ) : variant === 'info' ? (
                     <InfoIcon />
                  ) : (
                     variant === 'publish' && (
                        <div className="circle-icon">
                           <PlusIcon />
                        </div>
                     )
                  )}
               </StyledCloseButton>
            </div>
         )}
         {variant === 'publish' && (
            <ContainerPublish>
               <TitlePublish>{t('user.createModal.title')}</TitlePublish>

               <ButtonAdversitinPublish>
                  <ButtunPublish
                     onClick={() => handleNavigationPage('create-ad')}
                  >
                     {t('user.createModal.addBtn')}
                  </ButtunPublish>
                  <ButtunStyle
                     onClick={() => handleNavigationPage('advertising_page')}
                  >
                     {t('user.createModal.advertisingBtn')}
                  </ButtunStyle>
               </ButtonAdversitinPublish>
            </ContainerPublish>
         )}
         <div className="dialog-content">{children}</div>
      </StyledContainer>
   )
}

export default Modal

const StyledContainer = styled(Dialog)(({ theme, variant }) => ({
   '& ::-webkit-scrollbar-thumb': {
      borderRadius: '0.625rem',
      backgroundColor: theme.palette.secondary.input,
   },

   '& ::-webkit-scrollbar': {
      width: '7px',
      backgroundColor: theme.palette.primary.backgroundAdmin,
   },

   '& .MuiDialog-paper': {
      borderRadius: '0.625rem',
      padding: '2.5rem',
      paddingTop: variant === 'custom' ? '2.5rem' : '3.8rem',
      overflow: 'visible',
      maxWidth: '1200px',
      minWidth: '400px',
      [theme.breakpoints.down('md')]: {
         paddingLeft: '16px',
         paddingRight: '16px',
      },
   },

   '& .close-button-container': {
      position: 'absolute',
      backgroundColor: 'white',
      borderRadius: '50%',

      border:
         variant === 'delete'
            ? '1px solid #FF0000'
            : variant === 'phone'
              ? '3px solid #5EB00E'
              : variant === 'publish'
                ? '3px solid #5EB00E'
                : '1px solid #e6a600',

      zIndex: 1000,
      display: 'flex',
      top: '-50px',
      left: '50%',
      width: '6.25rem',
      height: '6.25rem',
      alignItems: 'center',
      justifyContent: 'center',
      translate: '-50% 0',
   },

   '& .dialog-content': {
      padding: ' 0rem',
      marginRight: '0.88rem',
   },
}))

const StyledCloseButton = styled('button')(() => ({
   width: '2.25rem',
   height: '2.25rem',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   border: 'none',
   backgroundColor: 'transparent',
   cursor: 'pointer',
}))
const TitlePublish = styled('div')(() => ({
   fontSize: '20px',
   fontWeight: '700',
   lineHeight: '21.78px',
   padding: '34px 0 34px 0',
}))
const ContainerPublish = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'center',
   alignItems: 'center',
}))
const ButtunStyle = styled(Button)(() => ({
   background: '#5EB00E',
   width: '125px',
   height: '46px',

   '&:hover': {
      background: '#5EB00E',
   },
}))
const ButtunPublish = styled(Button)(() => ({
   width: '161px',
   height: '46px',
}))
const ButtonAdversitinPublish = styled('div')(() => ({
   display: 'flex',
   gap: '20px',
}))
