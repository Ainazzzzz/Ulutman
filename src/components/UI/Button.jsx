import { Button as MuiButton, styled } from '@mui/material'

const getButtonVariantStyles = variant => {
   const commonStyles = {
      background: 'rgba(126, 82, 255, 0.1)',
      color: '#7E52FF',
      border: '1px solid #7E52FF',
      ':hover': {
         background: '#9774FF',
         color: '#FFF',
         border: '1px solid transparent',
      },
   }
   switch (variant) {
      case 'outlined':
         return commonStyles
      case 'text':
         return {
            ...commonStyles,
            border: '1px solid transparent',
         }

      case 'search':
         return {
            background: '#7E52FF',
            color: '#FFF',
            padding: '17px 24px',
            fontSize: '18px',
            fontWeight: '400',
            borderRadius: '0 10px 10px 0',
            '&:hover': {
               background: '#9774FF',
            },
         }

      case 'sort':
         return {
            background: '#7E52FF',
            color: '#FFF',
            minWidth: '195px',
            minHeight: '56px',
            display: 'flex',
            fontWeight: '400',
            gap: '5px',
            fontSize: '18px',
            lineHeight: '21.78px',

            '&:hover': {
               background: '#9774FF',
            },
         }

      case 'category-sort':
         return {
            minWidth: '159px',
            backgroundColor: '#B8FF00',
            minHeight: '39px',
            textTransform: 'none',
            padding: '10px',
            display: 'flex',
            gap: '5px',
            borderRadius: '10px',
            fontWeight: '600',
            lineHeight: '19.36px',
            color: '#282828',

            '&:hover': {
               backgroundColor: '#B8FF00',
            },

            '&:active': {
               backgroundColor: '#B8FF00',
            },

            '&.Mui-disabled': {
               opacity: '0.5',
            },
         }

      case 'warning':
         return {
            color: '#ff0000',
         }

      case 'contained':
      default:
         return {
            background: '#7E52FF',
            color: '#FFF',

            '&:hover': {
               background: '#9774FF',
            },
         }
   }
}

export const Button = ({
   children,
   variant = 'contained',
   type,
   onClick,
   disabled,
   ...props
}) => {
   return (
      <StyledButton
         type={type}
         variant={variant}
         onClick={onClick}
         disabled={disabled}
         {...props}
      >
         {children}
      </StyledButton>
   )
}

const StyledButton = styled(MuiButton)(({ variant }) => ({
   '&.MuiButtonBase-root': {
      textTransform: 'none',
   },

   borderRadius: '10px',
   fontSize: '1rem',
   fontWeight: '700',
   padding: '9px 16px',
   cursor: 'pointer',
   '&:active': {
      background: '#5C24FF !important',
      color: '#FFF',
   },
   '&:disabled': {
      background: '#B3B3B3',
      color: '#FFF',
   },
   ...getButtonVariantStyles(variant),
}))
