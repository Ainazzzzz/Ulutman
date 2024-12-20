import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker'
import { styled } from '@mui/material'
import dayjs from 'dayjs'

const DatePicker = ({
   setDates,
   error,
   helperText,
   handleChange,
   value,
   disableDate,
   ...props
}) => {
   const handleDateChange = newDate => {
      const formattedNewDate = newDate.format('DD.MM.YY')
      handleChange(prev => {
         if (!prev.includes(formattedNewDate)) {
            return [...prev, formattedNewDate]
         }
         return prev
      })
   }

   const disablePastDates = date => {
      if (disableDate) return date.isBefore(dayjs(disableDate), 'day')

      return date.isBefore(dayjs(), 'day')
   }

   return (
      <DatePickerStyle
         shouldDisableDate={disablePastDates}
         placeholder="asd"
         onChange={handleDateChange}
         value={value}
         slotProps={{
            desktopPaper: {
               sx: {
                  '& .MuiPickersDay-root': {
                     '&.Mui-selected': {
                        backgroundColor: '#7e52ff',
                        color: '#fff',
                     },
                  },
               },
            },
            textField: { placeholder: 'ММ.ДД.ГГГГ', error, helperText },
         }}
         {...props}
      />
   )
}

export default DatePicker

const DatePickerStyle = styled(MuiDatePicker)(() => ({
   '.MuiInputLabel-root': {
      color: '#202224',
      fontWeight: '700',
      fontSize: '14px',
   },
   '& .MuiOutlinedInput-root': {
      borderRadius: '0px',
   },

   '& .MuiButtonBase-root-MuiPickersDay-root.Mui-selected': {
      '& :hover': {
         backgroundColor: '#7e52ff',
         color: '#fff',
      },
   },

   '& .MuiFormHelperText-root.Mui-error': {
      color: '#f00',
      fontSize: '14px',
      fontWeight: '300',
      margin: '0',
   },
}))
