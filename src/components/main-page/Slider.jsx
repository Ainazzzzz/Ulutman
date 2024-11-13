import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { styled } from '@mui/material';
import { slider } from '../../utils/constants/slider';
import SliderArrow from '../../assets/icons/slider-arrow.svg?react';
import { useCallback, useRef } from 'react';

import 'swiper/css';

const Slider = () => {
   const sliderRef = useRef(null);

   const handlePrev = useCallback(() => {
      if (!sliderRef.current) return;
      sliderRef.current.swiper.slidePrev();
   }, []);

   const handleNext = useCallback(() => {
      if (!sliderRef.current) return;
      sliderRef.current.swiper.slideNext();
   }, []);

   return (
      <StyledSwiper
         ref={sliderRef}
         modules={[Navigation]}
         slidesPerView={'auto'}
         spaceBetween={30}
         loop={true}
         navigation={false}
      >
         {slider.map(item => (
            <StyledSwiperSlide key={item.id}>
               <img src={item.sliderImages} alt="slider image" />
            </StyledSwiperSlide>
         ))}
         <PrevArrow className="prev-arrow" onClick={handlePrev}>
            <SliderArrow />
         </PrevArrow>
         <NextArrow className="next-arrow" onClick={handleNext}>
            <SliderArrow />
         </NextArrow>
      </StyledSwiper>
   );
};

export default Slider;

const StyledSwiper = styled(Swiper)(() => ({
   width: '100%',
   position: 'relative',
}));

const StyledSwiperSlide = styled(SwiperSlide)(({ theme }) => ({
   width: '460px',
   height: '250px',

   [theme.breakpoints.down('md')]: {
      width: '260px',
      height: '150px',
   },

   img: {
      width: '100%',
      height: '100%',
      borderRadius: '10px',
   },
}));

const PrevArrow = styled('div')(() => ({
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
   left: '15%',
}));

const NextArrow = styled('div')(() => ({
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
   right: '15%',
}));
