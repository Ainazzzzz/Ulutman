import { createTheme } from '@mui/material';

const theme = createTheme({
   palette: {
      primary: {
         main: '#909090',
      },
      background: {
         default: '#282828',
         paper: '#FFFFFF',
      },
      text: {
         primary: '#282828',
         secondary: '#909090',
      },
   },
   typography: {
      fontFamily: 'Inter',
   },
});
export default theme;
