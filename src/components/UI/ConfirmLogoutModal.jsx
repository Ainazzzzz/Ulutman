import { DialogActions, DialogContent, styled } from '@mui/material';
import Modal from './Modal';
import { Button } from './Button';

export const ConfirmLogoutModal = ({ open, onClose, onConfirm }) => (
   <Modal open={open} handleClose={onClose}>
      <StyledDialogContent>Вы точно хотите выйти?</StyledDialogContent>
      <StyledDialogActions>
         <Button onClick={onClose} variant="outlined">
            Отмена
         </Button>
         <Button onClick={onConfirm}>Выйти</Button>
      </StyledDialogActions>
   </Modal>
);

const StyledDialogContent = styled(DialogContent)({
   fontSize: '18px',
   fontWeight: '500',
   color: '#202020',
   textAlign: 'center',
});

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
});
