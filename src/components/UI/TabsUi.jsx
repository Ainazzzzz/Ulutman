import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, colors, styled, Tab } from '@mui/material';
import React, { useState } from 'react';

const TabsUi = ({ tabs, onTabChange }) => {
   const [value, setValue] = useState('1');

   const handleChange = (event, newValue) => {
      setValue(newValue);
      if (onTabChange) onTabChange(newValue);
   };
   return (
      <BoxStyle>
         <TabContext value={value}>
            <ScrollableTabList
               onChange={handleChange}
               aria-label="scrollable auto tabs example"
               variant="scrollable"
               scrollButtons="auto"
            >
               {tabs.map(tab => (
                  <TabsStyle
                     key={tab.value}
                     label={tab.label}
                     value={tab.value}
                  />
               ))}
            </ScrollableTabList>

            {tabs.map(tab => (
               <TabPanel key={tab.value} value={tab.value}>
                  {tab.content}
               </TabPanel>
            ))}
         </TabContext>
      </BoxStyle>
   );
};

export default TabsUi;
const BoxStyle = styled(Box)(({ theme }) => ({
   width: '100%',
}));

const ScrollableTabList = styled(TabList)(({ theme }) => ({
   [theme.breakpoints.down('md')]: {
      overflowX: 'auto',
   },
   '& .MuiTabs-flexContainer': {
      display: 'flex',
   },

   '& .MuiTabs-indicator': {
      display: 'none',
   },
}));

const TabsStyle = styled(Tab)(({ theme }) => ({
   color: '#282828',
   fontFamily: 'Inter',
   fontWeight: '500',
   fontSize: '22px',
   textTransform: 'inherit',
   cursor: 'pointer',

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
   },

   [theme.breakpoints.down('md')]: {
      fontSize: '18px',
   },
   '&.Mui-selected': {
      color: 'black',
   },

   '&.Mui-selected': {
      color: '#7E52FF',
      borderBottom: '2px solid #7E52FF',
   },
}));
