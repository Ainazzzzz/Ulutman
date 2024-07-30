import { Box, Typography, styled } from '@mui/material';
import Breadcrumbs from '../../components/UI/Breadcrumbs';
import LocationIcon from '../../assets/icons/address-icon.svg?react';
import ClockIcon from '../../assets/icons/clock-icon.svg?react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import { useState } from 'react';
import firstImage from '../../assets/images/slider-images/first.png';
import secondthImage from '../../assets/images/slider-images/second.png';
import thirdImage from '../../assets/images/slider-images/third.png';
import fourthImage from '../../assets/images/slider-images/fourth.png';
import fifthImage from '../../assets/images/slider-images/fifth.png';
import sixthImage from '../../assets/images/slider-images/sixth.png';
import seventhImage from '../../assets/images/slider-images/seventh.png';
import eightImage from '../../assets/images/slider-images/eight.png';
import ninthImage from '../../assets/images/slider-images/ninth.png';
import tenthImage from '../../assets/images/slider-images/tenth.png';

const DetailInfo = () => {
   const path = [
      { title: 'Главная', url: '#' },
      { title: '2х комнатная квартира', url: '#' },
   ];

   const [slides, setSlides] = useState([
      { id: 1, image: firstImage },
      { id: 2, image: secondthImage },
      { id: 3, image: thirdImage },
      { id: 4, image: fourthImage },
      { id: 5, image: fifthImage },
      { id: 6, image: sixthImage },
      { id: 7, image: seventhImage },
      { id: 8, image: eightImage },
      { id: 9, image: ninthImage },
      { id: 10, image: tenthImage },
   ]);

   return (
      <StyledContainer>
         <Breadcrumbs path={path} />

         <Box className="locatio-time-box">
            <Typography>
               <LocationIcon className="location-icon" />
               Москва, р-н Центральный
            </Typography>

            <Typography>
               <ClockIcon />5 августа 2024 г.
            </Typography>
         </Box>

         <Box>
            <Typography className="title" variant="h3">
               3х комнатная квартира
            </Typography>

            <Box>
               <Box className="slider">
                  <Swiper
                     cssMode={true}
                     navigation={true}
                     pagination={true}
                     mousewheel={true}
                     keyboard={true}
                     modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                     className="mySwiper"
                  >
                     {slides.map(slide => (
                        <SwiperSlide key={slide.id}>
                           <img src={slide.image} alt={`Slide ${slide.id}`} />
                        </SwiperSlide>
                     ))}
                  </Swiper>
               </Box>
               <Box></Box>
            </Box>
         </Box>
      </StyledContainer>
   );
};

export default DetailInfo;

const StyledContainer = styled(Box)(() => ({
   '& .locatio-time-box': {
      display: 'flex',
      color: '#A0A0A0',
      alignItems: 'center',
      gap: '2rem',

      p: {
         fontSize: '12px',
         fontWeight: '400',
         display: 'flex',
         alignItems: 'center',
         gap: '0.5rem',
      },
   },

   '& .location-icon': {
      svg: {
         g: {
            path: {
               stroke: '#A0A0A0',
            },
         },
      },
   },

   '& .slider': {
      '& .swiper': {
         width: '50%',
      },

      '& .swiper-slide': {
         display: 'flex',
         justifyContent: 'center',
         alignItems: 'center',
      },

      '& .swiper-slide img': {
         display: 'block',
         width: '100%',
         height: '100%',
         objectFit: 'cover',
      },
   },

   '& .title': {
      fontSize: '34px',
      fontWeight: '500',
      lineHeight: '41.15px',
   },
}));
