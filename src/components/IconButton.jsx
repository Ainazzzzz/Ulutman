import { IconButton as MuiIconButton, styled } from '@mui/material';

export const IconButton = ({ children, type = 'button', onClick }) => {
   return (
      <StyledButton type={type} onClick={onClick}>
         {children}
      </StyledButton>
   );
};

const StyledButton = styled(MuiIconButton)(() => ({
   background: '#7E52FF',
   borderRadius: '0.625rem',
   padding: '0.5rem 1rem',
   display: 'flex',
   flexWrap: 'nowrap',
   gap: '8px',
   fontWeight: '500',
   fontSize: '1rem',
   color: 'white',
   cursor: 'pointer',
   '&:hover': {
      background: '#9774FF',
   },
   '&:active': {
      background: '#5C24FF',
   },
   '&:disabled': {
      background: '#B3B3B3',
   },
}));
