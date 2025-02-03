import { styled } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { MainBanner } from '../components/main-page/MainBanner'
import AnnouncementsSorter from '../components/AnnouncementsSorter'
import AboutUs from '../components/main-page/AboutUs'
import { Button } from '../components/UI/Button'
import { SORT_BY_CATEGROY_OPTIONS } from '../utils/constants'
import { CardList } from '../components/UI/Card/CardList'
import { getMainAds, sortPublishesRequest } from '../redux/main/mainThunk'
import Slider from '../components/main-page/Slider'

export const MainPage = () => {
   const { publishes, isLoading } = useSelector(state => state.main)
   const { t } = useTranslation()

   const [sortedAds, setSortedAds] = useState([])
   const dispatch = useDispatch()
   const navigate = useNavigate()

   useEffect(() => {
      dispatch(getMainAds())
   }, [dispatch])

   useEffect(() => {
      setSortedAds(publishes)
   }, [publishes])

   const seeMoreHandler = () => {
      navigate('/user/recommendations')
   }

   const handleSortChange = sortValue => {
      dispatch(sortPublishesRequest(sortValue))
   }
   const transformedSortCategory = SORT_BY_CATEGROY_OPTIONS.map(item => {
      return {
         ...item,
         label: t(`global.sortCategory.${item.value}`),
      }
   })
   const hasPublishes = sortedAds.length > 0

   return (
      <div>
         <MainBanner />
         <SliderBox>
            <Slider />
         </SliderBox>
         <Container>
            <Block>
               <Title>{t('user.home.publishes.title')}</Title>
               {hasPublishes && (
                  <AnnouncementsSorter
                     options={transformedSortCategory}
                     onSortChange={handleSortChange}
                  />
               )}
            </Block>

            <CardAdvetisinBox>
               <CardList cards={sortedAds.slice(0, 8)} loading={isLoading} />
               {/* <div>
                  {isMobile &&
                     advertising?.map(image => (
                        <WrapperAdvertising key={image.id}>
                           <AdvertisingCategory image={image.imageFile} />
                        </WrapperAdvertising>
                     ))}
               </div> */}
            </CardAdvetisinBox>
            {hasPublishes && (
               <Button variant="category-sort" onClick={seeMoreHandler}>
                  {t('user.home.publishes.all-publishes-button')}
               </Button>
            )}
            <AboutUs />
         </Container>
      </div>
   )
}

const Title = styled('p')(({ theme }) => ({
   fontSize: '34px',
   fontWeight: '600',
   [theme.breakpoints.down('md')]: {
      fontSize: '24px',
   },
}))
const Block = styled('div')(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-between',
   [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      gap: '10px',
   },
}))
export const Container = styled('div')(({ theme }) => ({
   padding: '60px',
   display: 'flex',
   flexDirection: 'column',
   gap: '24px',
   [theme.breakpoints.down('md')]: {
      padding: '20px 16px 0px 16px',
   },
}))

const SliderBox = styled('div')(({ theme }) => ({
   margin: '-125px 0 0 0',
   [theme.breakpoints.down('md')]: {
      display: 'none',
   },
}))
const CardAdvetisinBox = styled('div')(() => ({
   display: 'flex',
}))
// const WrapperAdvertising = styled('div')(({ theme }) => ({
//    marginBottom: '48px',
//    [theme.breakpoints.down('md')]: {
//       width: '100%',
//       maxHeight: 'calc(100vh - 200px)',
//       overflowY: 'auto',
//    },
//    img: {
//       width: '100%',
//       height: '100%',
//       objectFit: 'cover',
//    },
// }))
