/* eslint-disable react/no-unstable-nested-components */
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker'
import { styled, Typography } from '@mui/material'
import { useState } from 'react'
import DatePickerIcon from '../../assets/icons/black-down.svg?react'
import { Button } from './Button'

export const MultiDatePicker = ({ setDate }) => {
   const [open, setOpen] = useState(false)
   const [dates, setDates] = useState([])

   const [, setSelectedDates] = useState([])

   const handleDateChange = newDate => {
      const formattedNewDate = newDate.format('DD.MM.YY')
      setDates(prev => {
         if (!prev.includes(formattedNewDate)) {
            return [...prev, formattedNewDate]
         }
         return prev
      })

      setSelectedDates(prevDates => {
         const dateExists = prevDates.some(date => date.isSame(newDate, 'day'))
         if (dateExists) {
            return prevDates.filter(date => !date.isSame(newDate, 'day'))
         }
         return [...prevDates, newDate]
      })
   }

   const deleteDate = date => {
      const updatedDate = dates.filter(item => item !== date)
      setDates(updatedDate)
   }

   const handleOpen = () => setOpen(true)
   const handleClose = () => setOpen(false)

   const handleApply = () => {
      const formattedDates = dates
      setDate(formattedDates)
      handleClose()
   }

   const CustomDatePicker = ({ children, onApply }) => (
      <Box>
         {children}
         <>
            {dates && dates.length !== 0 ? (
               <DateContainer>
                  {dates.map(item => (
                     <Date onClick={() => deleteDate(item)} key={item}>
                        {item}
                     </Date>
                  ))}
               </DateContainer>
            ) : (
               <p>*Вы можете выбрать несколько дат</p>
            )}
            <ButtonStyle variant="contained" color="primary" onClick={onApply}>
               Применить
            </ButtonStyle>
         </>
      </Box>
   )

   const renderDay = day => {
      return (
         <Box
            onClick={() => handleDateChange(day)}
            sx={{
               borderRadius: '50%',
               display: 'inline-block',
               width: '36px',
               height: '36px',
               lineHeight: '36px',
               textAlign: 'center',
               cursor: 'pointer',
            }}
         >
            {day.date()}
         </Box>
      )
   }

   return (
      <DemoContainer components={['DateCalendar']}>
         <DatePickerStyle
            label="Дата"
            // slots={{
            //    openPickerIcon: DatePickerIcon,
            //    layout: CustomDatePicker,
            // }}
            value={null}
            onChange={handleDateChange}
            open={open}
            onOpen={handleOpen}
            renderDay={renderDay}
            slots={{
               openPickerIcon: DatePickerIcon,
               layout: props => (
                  <CustomDatePicker {...props} onApply={handleApply} />
               ),
            }}
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
               popper: {
                  sx: {
                     '& .MuiPaper-root': {
                        padding: '24px 0',
                        width: '330px',
                        borderRadius: '20px',
                     },

                     '& .MuiPickersCalendarHeader-label': {
                        color: '#202224',
                        fontWeight: '700',
                        fontSize: '15px',
                     },
                     '& .MuiPickersDay-root': {
                        color: '#282828',
                        fontWeight: '600',
                     },
                     '& .MuiDayCalendar-weekDayLabel': {
                        fontWeight: '700',
                     },
                     '.MuiSvgIcon-root': {
                        background: '#e7e9ee',
                        borderRadius: '6px',
                     },
                     '.MuiPickersCalendarHeader-switchViewIcon': {
                        display: 'none',
                     },

                     '.MuiDayCalendar-monthContainer': {
                        borderBottom: '1px solid #979797',
                        paddingBottom: '20px',
                        width: '100%',
                     },

                     '.MuiPickersCalendarHeader-root': {
                        borderBottom: '1px solid #979797',
                        marginBottom: '24px',
                        paddingBottom: '30px',
                     },

                     '.MuiInputBase-input-MuiOutlinedInput-input': {
                        borderRadius: '20px',
                     },
                  },
               },
            }}
         />
      </DemoContainer>
   )
}

const DatePickerStyle = styled(MuiDatePicker)(() => ({
   '.MuiSvgIcon-root': {
      display: 'none',
   },
   '.MuiInputLabel-root': {
      color: '#202224',
      fontWeight: '700',
      fontSize: '14px',
   },
   '& .MuiOutlinedInput-root': {
      borderRadius: '0px',
   },

   '& .MuiInputBase-root': {
      display: 'grid',
      gridTemplateColumns: '1fr 0.5fr',
      padding: '0',
   },
}))

const Box = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   p: {
      fontSize: '14px',
      fontWeight: '400',
      color: '#434343',
      paddingBottom: '20px',
      paddingTop: '20px',
   },
}))
const ButtonStyle = styled(Button)(() => ({
   textTransform: 'inherit',
   fontWeight: '500',
}))

const DateContainer = styled('div')(() => ({
   display: 'flex',
   margin: '0 0 10px 0',
   flexWrap: 'wrap',
   justifyContent: 'center',
   padding: '0 10px',
   overflow: 'hidden',
   overflowY: 'auto',
   alignItems: 'start',
   gap: '5px',
}))

const Date = styled(Typography)(() => ({
   margin: 0,
   padding: '8px !important',
   border: '1px solid gray',
   borderRadius: '10px',
   cursor: 'pointer',
}))
