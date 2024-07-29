import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import DatePickerIcon from '../../assets/icons/black-down.svg?react';
import { styled } from '@mui/material';
import { Button } from './Button';
import { useState } from 'react';

const CustomDatePicker = props => (
   <Box>
      {props.children}
      <>
         <p>*Вы можете выбрать несколько дат</p>
         <ButtonStyle
            variant="contained"
            color="primary"
            onClick={props.onApply}
         >
            Применить
         </ButtonStyle>
      </>
   </Box>
);
export const BasicDatePicker = () => {
   const [open, setOpen] = useState(false);
   const [dates, setDates] = useState([]);

   const [selectedDates, setSelectedDates] = useState([]);

   const handleDateChange = newDate => {
      setDates(prev => [...prev, newDate]);

      console.log(dates);
      setSelectedDates(prevDates => {
         const dateExists = prevDates.some(date => date.isSame(newDate, 'day'));
         if (dateExists) {
            return prevDates.filter(date => !date.isSame(newDate, 'day'));
         } else {
            return [...prevDates, newDate];
         }
      });
   };

   const handleOpen = () => setOpen(true);

   const handleApply = () => {
      const formattedDates = selectedDates.map(date =>
         date.format('DD.MM.YYYY'),
      );
      console.log(formattedDates);
   };

   const renderDay = day => {
      const isSelected = selectedDates.some(date => date.isSame(day, 'day'));
      return (
         <Box
            onClick={() => handleDateChange(day)}
            sx={{
               backgroundColor: isSelected ? '#7e52ff' : 'transparent',
               color: isSelected ? 'white' : 'inherit',
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
      );
   };

   return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
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
                           paddingTop: '24px',
                           width: '330px',
                           height: '490px',
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
      </LocalizationProvider>
   );
};

const DatePickerStyle = styled(DatePicker)(() => ({
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
}));

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
}));
const ButtonStyle = styled(Button)(() => ({
   textTransform: 'inherit',
   fontWeight: '500',
}));
