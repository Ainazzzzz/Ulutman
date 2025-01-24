import { InputAdornment, styled, TextField, useMediaQuery } from '@mui/material'
import Search from '../../assets/icons/search.svg?react'
import { Button } from './Button'
import ReusableSelect from './Select'
import { useTranslation } from 'react-i18next'

export const SearchInputSelect = ({
   onClick,
   selectValue,
   handleChangeSearch,
   onSelectChange,
   options,
   search,
}) => {
   const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'))
   const { t } = useTranslation()
   return (
      <Wrapper>
         <StyledInput
            fullWidth
            value={search}
            placeholder={t('user.home.banner.form.search-publishes')}
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
                              placeholder={t(
                                 'user.home.banner.form.select-metro',
                              )}
                           />
                        </InputAdornment>
                     )}
                  </>
               ),
            }}
         />
         <Button variant="search" onClick={onClick}>
            {t('global.searchButton')}
         </Button>
      </Wrapper>
   )
}

const Wrapper = styled('div')(({ theme }) => ({
   display: 'flex',
   width: '100%',
   height: '56px',
   [theme.breakpoints.down('md')]: {
      '& > button': {
         height: '45px',
      },
   },
}))

const StyledInput = styled(TextField)(({ theme }) => ({
   borderRadius: '10px 0px 0px 10px',
   background: '#fff',
   overflow: 'hidden',

   display: 'flex',
   justifyContent: 'center',

   [theme.breakpoints.down('md')]: {
      height: '45px',
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
}))

const StyledSelect = styled(ReusableSelect)(() => ({
   ' .MuiInputBase-input': {
      borderLeft: '1px solid gray',
      fontSize: '18px',
      padding: '18px 0 15px 10px',
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
}))
