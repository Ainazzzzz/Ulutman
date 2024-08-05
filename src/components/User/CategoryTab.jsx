import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useState } from 'react';
import { styled, useMediaQuery } from '@mui/system';
import { CategoryCard } from '../UI/CategoryCard';
import Filter from '../../assets/icons/filter-category-icon.svg?react';
import { CARDS, CARDS_MAIN } from '../../utils/constants';
import { AdvertisingCategory } from './AdvertisingCategory';
import AnnouncementsSorter from '../AnnouncementsSorter';
import { CardList } from '../UI/Card/CardList';
import { CategoryModal } from './CategoryModal';

export const CategoryTab = () => {
   const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'));

   const [value, setValue] = useState('1');

   const handleChange = (event, newValue) => {
      setValue(newValue);
   };
   return (
      <div>
         <Box>
            <TabContext value={value}>
               <BoxStyle>
                  <TabListStyle
                     onChange={handleChange}
                     variant={isMobile ? 'scrollable' : 'standart'}
                  >
                     <TabStyle label="Квартиры " value="1" />
                     <TabStyle label="Дома" value="2" />
                     <TabStyle label="Участок" value="3" />
                     <TabStyle label="Помещение" value="4" />
                     <TabStyle
                        label={
                           <span>
                              <Filter /> Ещё фильтры
                           </span>
                        }
                        value="5"
                     />
                  </TabListStyle>
                  <div>{!isMobile && <AnnouncementsSorter />}</div>
               </BoxStyle>
               <TabPanelStyle value="1">
                  {isMobile ? (
                     <CardList cards={CARDS_MAIN} advertising={CARDS} />
                  ) : (
                     <>
                        <MiniBlock>
                           <CategoryCard />
                        </MiniBlock>
                        <WrapperAdvertising>
                           {CARDS?.map((image, i) => (
                              <div>
                                 <AdvertisingCategory image={image} key={i} />
                              </div>
                           ))}
                        </WrapperAdvertising>
                     </>
                  )}
               </TabPanelStyle>
               <TabPanel value="2">нет данных</TabPanel>
               <TabPanel value="3">нет данных</TabPanel>
               <TabPanel value="4">нет данных</TabPanel>
               <TabPanel value="5">
                  <CategoryModal />
               </TabPanel>
            </TabContext>
         </Box>
      </div>
   );
};
const TabListStyle = styled(TabList)(({ theme }) => ({
   '.MuiTabs-indicator': {
      height: '0',
   },
   '.MuiTabs-flexContainer': {
      display: 'flex',
      gap: '24px',
   },
   [theme.breakpoints.down('md')]: {
      overflowX: 'scroll',
   },
}));
const TabStyle = styled(Tab)(({ theme }) => ({
   background: 'rgba(126, 82, 255, 0.1)',
   color: '#000',
   borderRadius: '10px',
   fontSize: '18px',
   fontWeight: '500',
   textTransform: 'inherit',
   padding: '20px 24px',
   [theme.breakpoints.down('md')]: {
      padding: '12px 24px',
   },

   '&.Mui-selected': {
      color: '#fff',
      backgroundColor: '#7e52ff',
      stroke: '#fff',
   },
   span: {
      display: 'flex',
      gap: '10px',
   },
}));

const TabPanelStyle = styled(TabPanel)(() => ({
   padding: '24px 0px',
   display: 'flex',
   justifyContent: 'space-between',
}));

const BoxStyle = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'space-between',
}));

const WrapperAdvertising = styled('div')({
   display: 'flex',
   flexDirection: 'column',
   gap: '24px',
});
const MiniBlock = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '24px',
}));
