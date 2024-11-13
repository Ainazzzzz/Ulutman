import { forwardRef } from 'react';
import { Dialog, Slide, styled } from '@mui/material';
import DeleteIcon from '../../assets/icons/trash.svg?react';
import InfoIcon from '../../assets/icons/info-warning.svg?react';
import PhoneIcon from '../../assets/icons/phone-green-icon.svg?react';

const Transition = forwardRef((props, ref) => (
   <Slide direction="up" ref={ref} {...props} />
));

const Modal = ({ children, variant = 'custom', handleClose, open }) => (
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
               ) : (
                  variant === 'info' && <InfoIcon />
               )}
            </StyledCloseButton>
         </div>
      )}

      <div className="dialog-content">{children}</div>
   </StyledContainer>
);

export default Modal;

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
              : '1px solid #e6a600',
      zIndex: 1000,
      display: 'flex',
      top: '-50px',
      width: '6.25rem',
      height: '6.25rem',
      left: '8.438rem',
      alignItems: 'center',
      justifyContent: 'center',
   },

   '& .dialog-content': {
      padding: ' 0rem',
      marginRight: '0.88rem',
   },
}));

const StyledCloseButton = styled('button')(() => ({
   width: '2.25rem',
   height: '2.25rem',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   border: 'none',
   backgroundColor: 'transparent',
   cursor: 'pointer',
}));
