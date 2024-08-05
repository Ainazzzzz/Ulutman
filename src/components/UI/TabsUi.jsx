import { styled, Tab, Tabs } from '@mui/material';
import React from 'react';

const TabsUi = ({ tabLabels }) => {
   return (
      <div>
         <Tabs
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs"
         >
            {tabLabels.map((label, index) => (
               <TabsStyle key={index} label={label} />
            ))}
         </Tabs>
      </div>
   );
};

export default TabsUi;

const TabsStyle = styled(Tab)(({ theme }) => ({
   color: '#282828',
   fontFamily: 'Inter',
   fontWeight: '500',
   fontSize: '22px',
   textTransform: 'inherit',
   ':hover': {
      color: '#7E52FF',
   },

   ':hover::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '80%',
      borderBottom: '2px solid #7E52FF',
   },
   [theme.breakpoints.down('md')]: {
      fontSize: '18px',
   },
}));
