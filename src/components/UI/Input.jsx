import { Box, InputAdornment, TextField, styled } from '@mui/material'
import React, { forwardRef, useState } from 'react'
import EyeIcon from '../../assets/icons/eye-icon.svg?react'
import CloseEyeIcon from '../../assets/icons/eye-close.svg?react'
import { IconButton } from '../IconButton'

const Input = forwardRef(
   ({ label = '', confirmed, required = false, type, ...props }, ref) => {
      const [showPassword, setShowPassword] = useState(false)

      const toggleShowPassword = () => {
         setShowPassword(prev => !prev)
      }

      return (
         <Container>
            <StyledLabel required={required} htmlFor={label}>
               {label} {confirmed && <Confirmed>{confirmed}</Confirmed>}
            </StyledLabel>
            <StyledInput
               id={label}
               ref={ref}
               type={showPassword ? 'text' : type}
               InputProps={
                  type === 'password'
                     ? {
                          endAdornment: (
                             <InputAdornment position="end">
                                <IconButton onClick={toggleShowPassword}>
                                   {!showPassword ? (
                                      <CloseEyeIcon
                                         width="20px"
                                         height="24px"
                                      />
                                   ) : (
                                      <EyeIcon width="20px" height="24px" />
                                   )}
                                </IconButton>
                             </InputAdornment>
                          ),
                       }
                     : null
               }
               {...props}
            />
         </Container>
      )
   },
)

export default Input

const Container = styled(Box)(() => ({
   display: 'flex',
   flexDirection: 'column',
}))

const StyledLabel = styled('label')(({ required }) => ({
   fontWeight: 600,
   lineHeight: '21px',
   margin: '0 0 4px 0',
   display: 'flex',
   gap: '14px',

   '::after': {
      content: required ? '" *"' : '""',
      color: '#ff0000',
   },
}))

const Confirmed = styled('p')(() => ({
   width: '123px',
   height: '23px',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   fontSize: '12px',
   fontWeight: '400',
   background: '#FF0000',
   color: '#FFFFFF',
   borderRadius: '4px',
}))

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
}))
