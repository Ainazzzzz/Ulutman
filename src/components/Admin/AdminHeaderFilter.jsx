import { styled } from '@mui/material'
import ReusableSelect from '../UI/Select'
import Filter from '../../assets/icons/filter-category-icon.svg?react'
import RedDeleteIcon from '../../assets/icons/red-delete-icon.svg?react'
import ReplayIcon from '../../assets/icons/replay-icon.svg?react'
import { MultiDatePicker } from '../UI/MultiDatePicker'

export const AdminHeaderFilter = ({
   selectedValues = {},
   onSelectChange,
   onDeleteModal,
   inputData,
   selectsConfig = [],
   onResetFilter,
   handleDateChange,
   handleChange,
   value,
}) => {
   return (
      <Container>
         <InputsWrapper>
            <TopSection>
               <FilterWrapper>
                  <Filter />
               </FilterWrapper>

               {inputData?.map(header => (
                  <label key={header.id} htmlFor={`input-${header.id}`}>
                     <StyledInput
                        id={`input-${header.id}`}
                        name={`input-${header.id}`}
                        type="text"
                        placeholder={header.value}
                        value={value[header.id] || ''}
                        onChange={e => handleChange(header.id, e.target.value)}
                     />
                  </label>
               ))}

               {selectsConfig?.map(select => (
                  <div
                     style={{
                        width: '200px',
                     }}
                     key={select.label}
                  >
                     {select.label === 'date' ? (
                        <StyledDatePickerWrapper>
                           <MultiDatePicker setDate={handleDateChange} />
                        </StyledDatePickerWrapper>
                     ) : (
                        <StyledSelect
                           value={selectedValues[select.label]}
                           onChange={e =>
                              onSelectChange(select.label, e.target.value)
                           }
                           options={select.options}
                           fullWidth
                        />
                     )}
                  </div>
               ))}

               <FilterResetSection onClick={onResetFilter}>
                  <ReplayIcon />
                  <p>Сбросить фильтр</p>
               </FilterResetSection>
            </TopSection>
            {onDeleteModal && (
               <div>
                  <RedDeleteIcon onClick={onDeleteModal} />
               </div>
            )}
         </InputsWrapper>
      </Container>
   )
}
const Container = styled('div')(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'space-between',
   gap: '10px',
   width: '100%',
   overflowX: 'auto',

   '::-webkit-scrollbar': {
      display: 'none',
   },

   scrollbarWidth: 'none',

   svg: {
      cursor: 'pointer',
   },

   [theme.breakpoints.down('md')]: {
      gap: '24px',
      alignItems: 'inherit',
   },
}))

const InputsWrapper = styled('div')(() => ({
   width: '100%',
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   gap: '10px',
   flexWrap: 'nowrap',
   overflowX: 'auto',

   '::-webkit-scrollbar': {
      display: 'none',
   },

   scrollbarWidth: 'none',
}))

const TopSection = styled('div')(() => ({
   display: 'flex',
   alignItems: 'center',
   flexWrap: 'nowrap',

   div: {
      maxWidth: '200px',
      minWidth: '100px',
      maxHeight: '70px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',

      p: {
         color: '#ea0234',
         fontWeight: '600',
         fontSize: '14px',
      },
   },
}))

const StyledInput = styled('input')(() => ({
   border: 'none',
   height: '70px',
   padding: '20px',
   borderTop: '1px solid #d5d5d5',
   borderLeft: '1px solid #d5d5d5',
   borderBottom: '1px solid #d5d5d5',
   fontSize: '14px',
   fontWeight: '700',
   cursor: 'pointer',
   color: '#202224',
   background: 'transparent',
   outline: 'none',

   '::placeholder': {
      color: '#202224',
   },
}))

const FilterWrapper = styled('p')(() => ({
   width: '64px',
   height: '70px',
   display: 'flex',
   gap: '8px',
   alignItems: 'center',
   justifyContent: 'center',
   borderTop: '1px solid #d5d5d5',
   borderLeft: '1px solid #d5d5d5',
   borderBottom: '1px solid #d5d5d5',
   borderTopLeftRadius: '14px',
   borderBottomLeftRadius: '14px',

   svg: {
      cursor: 'pointer',
   },
}))

const StyledDatePickerWrapper = styled('div')(() => ({
   paddingBottom: '8px',
   border: '1px solid #d5d5d5',

   '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
   },
}))

const StyledSelect = styled(ReusableSelect)(() => ({
   marginBottom: '18px',
   color: '#202224',
   fontWeight: '700',
   fontSize: '14px',

   '.MuiSelect-icon': {
      top: '30px',
      right: '24px',
   },

   '.MuiOutlinedInput-notchedOutline': {
      borderRadius: '0px',
      height: '75px',
      borderRight: 'none',
   },

   '&:hover .MuiOutlinedInput-notchedOutline': {
      border: '1px solid #d5d5d5',
      borderRight: 'none',
   },

   '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      border: '1px solid #d5d5d5',
      borderRight: 'none',
   },

   '.MuiSelect-select': {
      paddingTop: '23.5px',
   },
}))

const FilterResetSection = styled('div')(() => ({
   width: '193px',
   height: '70px',
   border: '1px solid #d5d5d5',

   borderTopRightRadius: '14px',
   borderBottomRightRadius: '14px',
   cursor: 'pointer',

   ':active': {
      svg: {
         transform: 'scale(0.9) rotate(-360deg)',
         transition: '0.2s',
      },
      p: {
         transform: 'scale(0.9)',
         transition: '0.5s',
      },
   },
}))
