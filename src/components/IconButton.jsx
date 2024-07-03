import { IconButton as MuiIconButton, styled } from '@mui/material';

export const IconButton = ({ children, type = 'button', onClick }) => {
   return (
      <StyledButton type={type} onClick={onClick}>
         {children}
      </StyledButton>
   );
};

const StyledButton = styled(MuiIconButton)(() => ({
<<<<<<< HEAD
   cursor: 'pointer',
=======
   borderRadius: '0.625rem',
>>>>>>> fc06efcc67955b125a7649e1fe9b968c52409922
}));
