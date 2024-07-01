import { Box, FormControl, TextField, styled } from '@mui/material';
import React, { forwardRef } from 'react';

const Input = forwardRef(({ label = '', required = false, ...props }, ref) => {
   return (
      <Container>
         <StyledLabel required={required} htmlFor={label}>
            {label}
         </StyledLabel>
         <StyledInput id={label} ref={ref} {...props} />
      </Container>
   );
});

export default Input;

const Container = styled(Box)(() => ({
   display: 'flex',
   flexDirection: 'column',
}));

const StyledLabel = styled('label')(({ required }) => ({
   fontWeight: 600,
   lineHeight: '21px',
   margin: '0 0 4px 0',

   '::after': {
      content: required ? '" *"' : '""',
      color: '#ff0000',
   },
}));

const StyledInput = styled(TextField)(() => ({
   '& .MuiInputBase-root': {
      borderRadius: '10px',
   },

   '& .MuiFormHelperText-root': {
      fontSize: '16px',
      fontWeight: 400,
      margin: 0,
   },

   '& .MuiFormHelperText-root.Mui-error': {
      color: '#FF0000',
   },

   input: {
      padding: '8px',
   },
}));
