import { IconButton as MuiIconButton, styled } from '@mui/material';

export const IconButton = ({ children, type = 'button', onClick }) => {
   return (
      <StyledButton type={type} onClick={onClick}>
         {children}
      </StyledButton>
   );
};

const StyledButton = styled(MuiIconButton)(() => ({
   cursor: 'pointer',
}));
