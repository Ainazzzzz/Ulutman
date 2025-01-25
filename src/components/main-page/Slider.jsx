import { Swiper, SwiperSlide } from 'swiper/react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigation } from 'swiper/modules'
import { styled, useMediaQuery } from '@mui/material'
import { useCallback, useEffect, useRef } from 'react'

import SliderArrow from '../../assets/icons/slider-arrow.svg?react'

import 'swiper/css'
import { getAdvertising } from '../../redux/advertising/advertisingThunk'

const Slider = () => {
   const sliderRef = useRef(null)
   const dispatch = useDispatch()
   const advertising = useSelector(state => state.advertising.advertising)
   const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'))
   console.log(advertising)

   useEffect(() => {
      dispatch(getAdvertising())
   }, [dispatch])

   const handlePrev = useCallback(() => {
      if (!sliderRef.current) return
      sliderRef.current.swiper.slidePrev()
   }, [])

   const handleNext = useCallback(() => {
      if (!sliderRef.current) return
      sliderRef.current.swiper.slideNext()
   }, [])

   return (
      <Wrapper>
         {isMobile ? (
            <StyledSwiper
               ref={sliderRef}
               modules={[Navigation]}
               slidesPerView="auto"
               spaceBetween={30}
               loop
               navigation={false}
            >
               {advertising.map(item => (
                  <StyledSwiperSlide key={item.id}>
                     <img src={item.imagePath} alt="реклама" />
                  </StyledSwiperSlide>
               ))}
               <PrevArrow onClick={handlePrev}>
                  <SliderArrow />
               </PrevArrow>
               <NextArrow onClick={handleNext}>
                  <SliderArrow />
               </NextArrow>
            </StyledSwiper>
         ) : (
            <StyledSwiper
               ref={sliderRef}
               modules={[Navigation]}
               slidesPerView="auto"
               spaceBetween={30}
               loop
               navigation={false}
            >
               {advertising.map(item => (
                  <StyledSwiperSlide key={item.id}>
                     <img src={item.imagePath} alt="реклама" />
                  </StyledSwiperSlide>
               ))}
               <PrevArrow onClick={handlePrev}>
                  <SliderArrow />
               </PrevArrow>
               <NextArrow onClick={handleNext}>
                  <SliderArrow />
               </NextArrow>
            </StyledSwiper>
         )}
      </Wrapper>
   )
}

export default Slider

const Wrapper = styled('div')({
   minHeight: '120px',
})

const StyledSwiper = styled(Swiper)(() => ({
   width: '100%',
   height: 'auto',
   position: 'relative',
}))

const StyledSwiperSlide = styled(SwiperSlide)(({ theme }) => ({
   width: '460px',
   height: '250px',

   [theme.breakpoints.down('md')]: {
      width: '100%',
      height: 'auto',
   },

   img: {
      width: '100%',
      height: '100%',
      borderRadius: '10px',
   },
}))

const PrevArrow = styled('div')(({ theme }) => ({
   width: 'fit-content',
   padding: '12px 16px',
   borderRadius: '50%',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: 'rgb(226,234,248, .5)',
   position: 'absolute',
   zIndex: 100,
   top: '40%',
   cursor: 'pointer',
   left: '10%',
   [theme.breakpoints.down('md')]: {
      left: '5%',
   },
}))

const NextArrow = styled('div')(({ theme }) => ({
   width: 'fit-content',
   transform: 'rotate(180deg)',
   padding: '12px 16px',
   borderRadius: '50%',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: 'rgb(226,234,248, .5)',
   position: 'absolute',
   zIndex: 100,
   top: '40%',
   cursor: 'pointer',
   right: '10%',
   [theme.breakpoints.down('md')]: {
      right: '5%',
   },
}))
