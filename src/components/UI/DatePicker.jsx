import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import DatePickerIcon from '../../assets/icons/black-down.svg?react';
import { styled } from '@mui/material';
import { Button } from './Button';

const CustomDatePicker = props => (
   <Box>
      {props.children}
      <>
         <p>*Вы можете выбрать несколько дат</p>
         <ButtonStyle variant="contained" color="primary">
            Применить
         </ButtonStyle>
      </>
   </Box>
);
export const BasicDatePicker = () => {
   return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
         <DemoContainer components={['DatePicker']}>
            <DatePickerStyle
               label="Дата"
               slots={{
                  openPickerIcon: DatePickerIcon,
                  layout: CustomDatePicker,
               }}
               slotProps={{
                  desktopPaper: {
                     sx: {
                        '.MuiPickersDay-root:focus.Mui-selected': {
                           background: '#7e52ff',
                           color: '#fff',
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
