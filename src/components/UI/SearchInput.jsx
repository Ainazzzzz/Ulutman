import { forwardRef } from 'react';
import { Paper, InputBase, styled } from '@mui/material';
import SearchIcon from '../../assets/icons/search.svg?react';
import { Button } from './Button';

const SearchInput = forwardRef(
   ({ placeholder, onChange, value, variant, onClick, ...rest }, ref) => (
      <StyledContainer variant={variant} className="container">
         <SearchIcon />

         <InputBase
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            ref={ref}
            {...rest}
         />

         <Button className="button" onClick={onClick} variant="search">
            Поиск
         </Button>
      </StyledContainer>
   ),
);

export default SearchInput;

const StyledContainer = styled(Paper)(({ theme }) => ({
   width: '100%',
   display: 'flex',
   alignItems: 'center',
   gap: '10px',
   paddingLeft: '15px',
   borderRadius: '10px',
   boxShadow: 'none',

   [theme.breakpoints.down('md')]: {
      '& > .button': {
         display: 'none',
      },
   },

   '& > .MuiInputBase-colorPrimary': {
      width: '100%',
      fontSize: '18px',
      fontWeight: '400',
      lineHeight: '21.78px',

      [theme.breakpoints.down('md')]: {
         fontSize: '14px',
         fontWeight: '400',
      },
   },

   '& > .MuiButton-root': {
      width: '15%',
      fontSize: '16px',
      fontWeight: '400',
   },
}));
