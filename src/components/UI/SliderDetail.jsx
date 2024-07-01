import React, { useRef, useState } from 'react';
import { Pagination, Thumbs, FreeMode, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';

import { styled } from '@mui/material';

const SliderDetail = ({ slider }) => {
   const [thumbsSwiper, setThumbsSwiper] = useState(null);
   const thumbsSwiperRef = useRef(null);

   const updateThumbsSwiper = swiper => {
      if (swiper && swiper !== thumbsSwiperRef.current) {
         setThumbsSwiper(swiper);
         thumbsSwiperRef.current = swiper;
      }
   };

   return (
      <WrapperContainer className="main-slider">
         <LargeSliderContainer
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiperRef.current }}
            modules={[Navigation, FreeMode, Thumbs, Pagination]}
            loop={true}
            className="main-slider"
            pagination={{
               clickable: true,
               dynamicBullets: true,
            }}
         >
            {slider.map(slide => (
               <SwiperSlide key={slide.id}>
                  <img src={slide.sliderImages} />
               </SwiperSlide>
            ))}
         </LargeSliderContainer>
         <div className="thumbs-slider">
            <Swiper
               onSwiper={updateThumbsSwiper}
               spaceBetween={10}
               freeMode={true}
               slidesPerView={11}
               watchSlidesVisibility
               watchSlidesProgress
               className="swiper-thumbs"
            >
               {slider.map(slide => (
                  <SwiperSlide key={slide.id}>
                     <img src={slide.sliderImages} alt={`Thumb ${slide.id}`} />
                  </SwiperSlide>
               ))}
            </Swiper>
         </div>
      </WrapperContainer>
   );
};

export default SliderDetail;
const WrapperContainer = styled('div')(() => ({
   '.main-slider': {
      width: '760px',
      height: '440px',
   },

   '.thumbs-slider': {
      marginTop: '20px',
   },
   '.swiper-thumbs': {
      width: '780px',
      padding: '10px',
   },

   '.swiper-thumbs .swiper-slide': {
      width: '60px',
      height: '64px',
   },

   '.swiper-thumbs .swiper-slide img': {
      width: '100%',
      height: 'auto',
      border: '1px solid #ddd',
      borderRadius: '3px',
   },
}));

const LargeSliderContainer = styled(Swiper)(() => ({
   borderRadius: '10px',
   background: 'rgb(217, 217, 217)',
   '--swiper-navigation-color': 'black',
   '--swiper-pagination-color': 'rgb(255, 255, 255);',
   '.swiper-button-next, .swiper-button-prev': {
      backgroundColor: 'rgb(226, 234, 248)',
      opacity: '0.7',
      borderRadius: '50%',
      width: '52px',
      height: '52px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',

      color: 'rgb(0, 0, 0)',
      '&:after': {
         fontSize: '15px',
         fontWeight: 'bold',
      },
   },
}));
