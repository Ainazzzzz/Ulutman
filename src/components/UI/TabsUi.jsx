import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, styled, Tab } from '@mui/material';
import React, { useState } from 'react';

const TabsUi = ({ tabs }) => {
   const [value, setValue] = useState('1');

   const handleChange = (event, newValue) => {
      setValue(newValue);
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
}));

const TabsStyle = styled(Tab)(({ theme }) => ({
   color: '#282828',
   fontFamily: 'Inter',
   fontWeight: '500',
   fontSize: '22px',
   textTransform: 'inherit',
   cursor: 'pointer',
   '.css-foga8i-MuiButtonBase-root-MuiTab-root.Mui-selected': {
      color: '#5a1e1e',
   },

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
