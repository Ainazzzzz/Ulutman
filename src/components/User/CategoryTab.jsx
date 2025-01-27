import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { useEffect, useState } from 'react'
import { styled, useMediaQuery } from '@mui/system'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { CategoryCard } from '../UI/CategoryCard'
import { AdvertisingCategory } from './AdvertisingCategory'
import AnnouncementsSorter from '../AnnouncementsSorter'
import { CardList } from '../UI/Card/CardList'
import { categoryTab } from '../../utils/constants/main'

import {
   categoriesFavorite,
   categoriesThunks,
   categoryFilter,
   getSubCategory,
   removeFromFavorites,
} from '../../redux/categories/userCategoriesThunk'
import { getAdvertising } from '../../redux/advertising/advertisingThunk'
import { useTranslation } from 'react-i18next'
import { Loading } from '../UI/Loading'

export const CategoryTab = () => {
   const { t } = useTranslation()
   const SORTY_CATEGORY_OPTIONS = [
      {
         value: 'newest',
         label: t('global.sortCategory.newest'),
      },
      {
         value: 'cheapest',
         label: t('global.sortCategory.cheapest'),
      },
      {
         value: 'expensive',
         label: t('global.sortCategory.expensive'),
      },
   ]
   const dispatch = useDispatch()

   const { categories, isLoading } = useSelector(state => state.userCategories)
   const { advertising } = useSelector(state => state.advertising)

   const { subCategory } = useParams()

   const [value, setValue] = useState('all')
   const [, setSortType] = useState('newest')

   const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'))

   useEffect(() => {
      dispatch(getAdvertising())
   }, [dispatch])

   useEffect(() => {
      dispatch(categoryFilter({ categories: [subCategory] }))
   }, [dispatch])

   const handleToggleFavorite = adsData => {
      if (adsData.detailFavorite) {
         dispatch(
            removeFromFavorites({
               id: adsData.id,
               subCategory: subCategory.toLowerCase(),
            }),
         )
      } else {
         dispatch(
            categoriesFavorite({
               id: adsData.id,
               subCategory: subCategory.toLowerCase(),
            }),
         )
      }
   }

   const findSubCategory = categoryTab.find(
      ({ category }) => category === subCategory,
   )

   const handleChange = (event, newValue) => {
      setValue(newValue)

      if (newValue === 'all') {
         dispatch(categoriesThunks({ subCategory: subCategory.toLowerCase() }))
      } else {
         const selectedSubCategory = findSubCategory?.subCategory.find(
            item => item.id === newValue,
         )

         if (selectedSubCategory) {
            dispatch(
               getSubCategory({
                  category: findSubCategory?.category?.toLowerCase(),
                  subCategory: selectedSubCategory.value,
               }),
            )
         }
      }
   }
   const handleSortChange = sortValue => {
      setSortType(sortValue)
      dispatch(categoryFilter({ categories: [subCategory], sortBy: sortValue }))
   }

   const transformedSubCategory = findSubCategory.subCategory.map(item => {
      return {
         ...item,
         text: t(item.text),
      }
   })
   console.log(categories)

   return (
      <div>
         <Box>
            <TabContext value={value}>
               <BoxStyle>
                  <TabListStyle
                     onChange={handleChange}
                     variant={isMobile ? 'scrollable' : 'standard'}
                  >
                     <TabStyle label="Все" value="all" />
                     {transformedSubCategory.map(item => (
                        <TabStyle
                           key={item.id}
                           label={item.text}
                           value={item.id}
                        />
                     ))}
                  </TabListStyle>
                  <div>
                     {transformedSubCategory > 0 && !isMobile && (
                        <AnnouncementsSorter
                           onSortChange={handleSortChange}
                           options={SORTY_CATEGORY_OPTIONS}
                        />
                     )}
                  </div>
               </BoxStyle>

               <TabPanelStyle value={value}>
                  {isMobile ? (
                     <>
                        <CardList cards={categories} />
                        <WrapperAdvertising>
                           {advertising?.map(image => (
                              <div key={image.id}>
                                 <AdvertisingCategory image={image.imagePath} />
                              </div>
                           ))}
                        </WrapperAdvertising>
                     </>
                  ) : (
                     <>
                        <MiniBlock>
                           <CategoryCard
                              categories={categories}
                              handleToggleFavorite={handleToggleFavorite}
                           />
                        </MiniBlock>
                        <WrapperAdvertising>
                           {advertising?.map(image => (
                              <div key={image.id}>
                                 <AdvertisingCategory image={image.imagePath} />
                              </div>
                           ))}
                        </WrapperAdvertising>
                     </>
                  )}
               </TabPanelStyle>
            </TabContext>
         </Box>
      </div>
   )
}
const TabListStyle = styled(TabList)(({ theme }) => ({
   gap: '10px',

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
}))
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
}))

const TabPanelStyle = styled(TabPanel)(() => ({
   padding: '24px 0px',
   display: 'flex',
   justifyContent: 'space-between',
}))

const BoxStyle = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'space-between',
   overflowX: 'auto',

   gap: '10px',
   alignItems: 'center',
}))

const WrapperAdvertising = styled('div')(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '24px',
   [theme.breakpoints.down('md')]: {
      width: '100%',
      maxHeight: 'calc(100vh - 200px)',
      overflowY: 'auto',
   },
   img: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
   },
}))
const MiniBlock = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '24px',
   width: '100%',
}))
