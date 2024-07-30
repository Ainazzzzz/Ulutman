import { styled, Tab, Tabs } from '@mui/material';
import React from 'react';

const ReusableTabs = () => {
   return (
      <div>
         <Tabs>
            <TabsStyle label="Профиль" />
            <TabsStyle label="Избранное" />
            <TabsStyle label="Сообщения" />
            <TabsStyle label="Мои объявления" />
         </Tabs>
      </div>
   );
};

export default ReusableTabs;

const TabsStyle = styled(Tab)(() => ({
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
}));
