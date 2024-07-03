import {
   InputAdornment,
   styled,
   TextField,
   useMediaQuery,
} from '@mui/material';
import Search from '../../assets/icons/search.svg?react';
import { Button } from './Button';
import ReusableSelect from './Select';

export const SearchInputSelect = ({
   onClick,
   selectValue = 'Aviamotornaya',
   handleChangeSearch,
   onSelectChange,
   options,
   search,
}) => {
   const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'));
   return (
      <Wrapper>
         <StyledInput
            fullWidth
            value={search}
            placeholder="Поиск по названию"
            onChange={handleChangeSearch}
            InputProps={{
               startAdornment: (
                  <InputAdornment position="start">
                     <Search className="search_icon" />
                  </InputAdornment>
               ),

               endAdornment: (
                  <>
                     {isMobile || (
                        <InputAdornment position="end">
                           <StyledSelect
                              value={selectValue}
                              options={options}
                              onChange={onSelectChange}
                           />
                        </InputAdornment>
                     )}
                  </>
               ),
            }}
         />
         {isMobile || (
            <Button variant="search" onClick={onClick}>
               Поиск
            </Button>
         )}
      </Wrapper>
   );
};

const Wrapper = styled('div')(({ theme }) => ({
   display: 'flex',
   width: '100%',
   height: '56px',
}));

const StyledInput = styled(TextField)(({ theme }) => ({
   borderRadius: '10px 0px 0px 10px',
   background: '#fff',
   overflow: 'hidden',

   display: 'flex',
   justifyContent: 'center',

   [theme.breakpoints.down('md')]: {
      borderRadius: '10px',
      height: '40px',
   },

   '.search_icon': {
      cursor: 'pointer',
   },

   '.MuiInputBase-input': {
      fontSize: '18px',
      fontWeight: '400',

      [theme.breakpoints.down('md')]: {
         fontSize: '14px',
      },
   },

   '& input:-webkit-autofill, & input:-webkit-autofill:hover, & input:-webkit-autofill:focus, & input:-webkit-autofill:active':
      {
         WebkitTransition:
            'color 9999s ease-out, background-color 9999s ease-out',
         WebkitTransitionDelay: '9999s',
      },

   '& fieldset': { border: 'none' },
}));

const StyledSelect = styled(ReusableSelect)(() => ({
   ' .MuiInputBase-input': {
      borderLeft: '1px solid gray',
      fontSize: '18px',
      padding: '18px 0 25px 10px',
   },

   '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
   },

   '&:hover .MuiOutlinedInput-notchedOutline': {
      border: 'none',
   },

   '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      border: 'none',
   },
}));
