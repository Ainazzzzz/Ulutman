import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useEffect, useState } from 'react';
import { display, styled, useMediaQuery } from '@mui/system';
import { CategoryCard } from '../UI/CategoryCard';
import Filter from '../../assets/icons/filter-category-icon.svg?react';
import { CARDS, CARDS_MAIN } from '../../utils/constants';
import { AdvertisingCategory } from './AdvertisingCategory';
import AnnouncementsSorter from '../AnnouncementsSorter';
import { CardList } from '../UI/Card/CardList';
import { FilterModal } from './FilterModal';
import { categories } from '../../utils/constants/main';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
   categoryFilter,
   getSubCategory,
} from '../../redux/categories/categoriesThunks';
import { cardGetAdvertising } from '../../redux/adversitingThunks';

export const CategoryTab = () => {
   const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'));
   const [value, setValue] = useState('e1');
   const categoryCard = useSelector(state => state.categories.categories);
   const [sortType, setSortType] = useState('newest');
   const advertising = useSelector(state => state.advertising.advertising);
   const categoriesCard = useSelector(state => state.categories.categories);

   const { subCategory } = useParams();
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(cardGetAdvertising());
   }, [dispatch]);

   const findSubCategory = categories.find(
      ({ category }) => category === subCategory,
   );

   const handleChange = (event, newValue) => {
      setValue(newValue);
      const selectedSubCategory = findSubCategory?.subCategory.find(
         item => item.id === newValue,
      );

      if (selectedSubCategory) {
         dispatch(getSubCategory({ subCategory: selectedSubCategory.value }));
      }
   };
   const handleSortChange = sortValue => {
      setSortType(sortValue);
      dispatch(
         categoryFilter({ categories: [subCategory], sortBy: sortValue }),
      );
   };

   const SORTY_CATEGORY_OPTIONS = [
      {
         value: 'newest',
         label: 'Сначала новые',
      },
      {
         value: 'cheapest',
         label: 'Сначала дешевые',
      },
      {
         value: 'expensive',
         label: 'Сначала дорогие',
      },
   ];

   return (
      <div>
         <Box>
            <TabContext value={value}>
               <BoxStyle>
                  <TabListStyle
                     onChange={handleChange}
                     variant={isMobile ? 'scrollable' : 'standard'}
                  >
                     {findSubCategory.subCategory.map(item => (
                        <TabStyle
                           key={item.id}
                           label={item.text}
                           value={item.id}
                        />
                     ))}

                     <TabStyle
                        label={
                           <span>
                              <Filter /> Ещё фильтры
                           </span>
                        }
                        value="5"
                     />
                  </TabListStyle>
                  <div>
                     {!isMobile && (
                        <AnnouncementsSorter
                           onSortChange={handleSortChange}
                           options={SORTY_CATEGORY_OPTIONS}
                        />
                     )}
                  </div>
               </BoxStyle>

               <TabPanelStyle value={value}>
                  {isMobile ? (
                     <CardList cards={categoryCard} advertising={advertising} />
                  ) : (
                     <>
                        <MiniBlock>
                           <CategoryCard categories={categoriesCard} />
                        </MiniBlock>
                        <WrapperAdvertising>
                           {advertising?.map(image => (
                              <div key={image.id}>
                                 <img
                                    src={image.imagePath}
                                    alt={`Advertisement ${image.id}`}
                                 />
                                 <AdvertisingCategory image={image.imagePath} />
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
                  <FilterModal />
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
      overflowX: 'auto',
      scrollbarWidth: 'none',
      '-ms-overflow-style': 'none',
   },
   '.MuiTabs-flexContainer::-webkit-scrollbar': {
      display: 'none',
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

const TabPanelStyle = styled(TabPanel)(({ theme }) => ({
   padding: '24px 0px',
   display: 'flex',
   justifyContent: 'space-between',
}));

const BoxStyle = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'space-between',
   overflowX: 'auto',
}));

const WrapperAdvertising = styled('div')(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '24px',
}));
const MiniBlock = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '24px',
}));
