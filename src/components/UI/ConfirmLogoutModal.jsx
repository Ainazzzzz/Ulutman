import { DialogActions, DialogContent, styled } from '@mui/material'
import { useTranslation } from 'react-i18next'
import Modal from './Modal'
import { Button } from './Button'

export const ConfirmLogoutModal = ({ open, onClose, onConfirm }) => {
   const { t } = useTranslation()

   return (
      <Modal open={open} handleClose={onClose}>
         <StyledDialogContent>{t('user.logOut.title')}</StyledDialogContent>
         <StyledDialogActions>
            <Button onClick={onClose} variant="outlined">
               {t('user.logOut.cancel')}
            </Button>
            <Button onClick={onConfirm}>{t('user.logOut.logOut')}</Button>
         </StyledDialogActions>
      </Modal>
   )
}

const StyledDialogContent = styled(DialogContent)({
   fontSize: '18px',
   fontWeight: '500',
   color: '#202020',
   textAlign: 'center',
})

const StyledDialogActions = styled(DialogActions)({
   display: 'flex',
   justifyContent: 'center',
   '& > button:first-of-type': {
      width: '123px',
      height: '46px',
      borderRadius: '8px',
   },
   '& > button:last-child': {
      width: '123px',
      height: '46px',
      borderRadius: '8px',
      background: '#FF0000',
   },
})
