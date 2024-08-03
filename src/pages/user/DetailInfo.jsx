import { Box, Rating, Typography, styled } from '@mui/material';
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
import Like from '../../assets/icons/like-product-icon.svg?react';
import ArrowIcon from '../../assets/icons/arrowpurpul.svg?react';
import { Button } from '../../components/UI/Button';
import UserIcon from '../../assets/icons/user.svg?react';

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
         <Box className="breadcrumbs-box">
            <Breadcrumbs path={path} />

            <Typography className="go-back">
               <ArrowIcon />
               назад
            </Typography>
         </Box>

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

            <Box className="fist-part_container">
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
                           <img
                              className="slide-image"
                              src={slide.image}
                              alt={`Slide ${slide.id}`}
                           />
                        </SwiperSlide>
                     ))}
                  </Swiper>

                  <Box className="images">
                     {slides.map(item => (
                        <img
                           key={item.id}
                           src={item.image}
                           alt={`Slide ${item.id}`}
                        />
                     ))}
                  </Box>
               </Box>

               {/*второй блок   */}
               <Box className="second-block">
                  <Box className="second_box">
                     <Box className="main-info">
                        <Typography>50 000 ₽/мес.</Typography>

                        <Like />
                     </Box>

                     <Box>
                        <Typography>
                           Оплата ЖКХ <Box className="line" /> включена (без
                           счётчиков)
                        </Typography>
                        <Typography>
                           Залог <Box className="line" /> 70 000 ₽
                        </Typography>
                        <Typography>
                           Комиссия <Box className="line" /> 55%
                        </Typography>
                        <Typography>
                           Предоплата
                           <Box className="line" />1 месяц
                        </Typography>
                        <Typography>
                           Срок аренды
                           <Box className="line" />
                           от года
                        </Typography>
                     </Box>
                     <Box className="btns-container">
                        <Button>Показать телефон</Button>

                        <Button variant="text">Написать</Button>
                     </Box>
                  </Box>

                  {/* second */}
                  <Box>
                     <Box>
                        <UserIcon />
                     </Box>
                     <Box>
                        <Typography>Риелтор</Typography>
                        <Typography>Екатерина Орлова</Typography>
                        <Rating value={5} readOnly />
                     </Box>
                  </Box>
               </Box>
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
   '& .breadcrumbs-box': {
      display: 'flex',
      justifyContent: 'space-between',

      '& > .go-back': {
         display: 'flex',
         alignItems: 'center',
         gap: '10px',
         color: ' #7E52FF',
         fontSize: '14px',
      },
   },

   '& .second-block': {},

   '& .second_box': {
      borderRadius: '10px',
      width: '460px',
      padding: '10px',
      height: '350px',
      boxShadow: ' 0px 7px 12px 1px rgba(34, 60, 80, 0.14)',
      backgroundColor: 'white',
   },

   '& .btns-container': {
      display: 'flex',
      flexDirection: 'column',
   },

   '& .line': {},

   '& .slide-image': {
      width: '760px !important',
      height: '446px !important',
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

   '& .fist-part_container': {
      display: 'flex',
      justifyContent: 'space-between',
   },

   '& .slider': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      width: '760px !important',

      '& .images': {
         display: 'flex',
         gap: '1rem',
      },

      '& .swiper': {
         width: '760px !important',
         display: 'flex',
         borderRadius: '10px',
         justifyContent: 'start',
      },

      '& .swiper-initialized': {
         margin: '0 !important',
      },

      '& .swiper-slide': {
         display: 'flex',
         justifyContent: 'start',
         width: '760px !important',
         height: '446px !important',
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
