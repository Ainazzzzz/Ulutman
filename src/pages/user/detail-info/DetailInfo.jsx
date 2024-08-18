import { Box, Rating, Typography, styled } from '@mui/material';
import Breadcrumbs from '../../../components/UI/Breadcrumbs';
import LocationIcon from '../../../assets/icons/address-icon.svg?react';
import ClockIcon from '../../../assets/icons/clock-icon.svg?react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import { useState } from 'react';
import firstImage from '../../../assets/images/slider-images/first.png';
import secondthImage from '../../../assets/images/slider-images/second.png';
import thirdImage from '../../../assets/images/slider-images/third.png';
import fourthImage from '../../../assets/images/slider-images/fourth.png';
import fifthImage from '../../../assets/images/slider-images/fifth.png';
import sixthImage from '../../../assets/images/slider-images/sixth.png';
import seventhImage from '../../../assets/images/slider-images/seventh.png';
import eightImage from '../../../assets/images/slider-images/eight.png';
import ninthImage from '../../../assets/images/slider-images/ninth.png';
import tenthImage from '../../../assets/images/slider-images/tenth.png';
import Like from '../../../assets/icons/like-product-icon.svg?react';
import ArrowIcon from '../../../assets/icons/arrowpurpul.svg?react';
import { Button } from '../../../components/UI/Button';
import UserIcon from '../../../assets/icons/user.svg?react';
import AboutApartment from './AboutApartment';

const DetailInfo = () => {
   const path = [
      { title: 'Главная', url: '#' },
      { title: '2х комнатная квартира', url: '#' },
   ];

   const slides = [
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
   ];

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

               <Box className="second-block">
                  <Box className="second_box">
                     <Box className="main-info">
                        <Typography className="price">50 000 ₽/мес.</Typography>

                        <Like />
                     </Box>

                     <Box className="info-box-container">
                        <Typography className="info-part">
                           Оплата ЖКХ <hr className="line" /> включена (без
                           счётчиков)
                        </Typography>

                        <Typography className="info-part">
                           Залог <hr className="line" /> 70 000 ₽
                        </Typography>

                        <Typography className="info-part">
                           Комиссия <hr className="line" /> 55%
                        </Typography>

                        <Typography className="info-part">
                           Предоплата
                           <hr className="line" />1 месяц
                        </Typography>

                        <Typography className="info-part">
                           Срок аренды
                           <hr className="line" />
                           от года
                        </Typography>
                     </Box>

                     <Box className="btns-container">
                        <Button>Показать телефон</Button>

                        <Button variant="text">Написать</Button>
                     </Box>
                  </Box>

                  <Box className="rieltor-info">
                     <Box className="user-icon-container">
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

         <Box className="description-container">
            <Typography variant="h3" className="description_detail-info">
               Описания объявления
            </Typography>
            <Typography className="descriptioon-text">
               ЖК "Водный", предлогается 2-х комнатная квартира с новым
               ремонтом.Кухня -гостиная, спальня, балкон. Имеется вся мебель и
               бытовая техника включая кондиционер. Есть возможность аренды
               машино-место.
            </Typography>

            <Typography className="read-more-text">
               Читать дальше
               <ArrowIcon className="arrow-down" />
            </Typography>
         </Box>

         <AboutApartment />
      </StyledContainer>
   );
};

export default DetailInfo;

const StyledContainer = styled(Box)(() => ({
   padding: '0 3rem',

   '& .locatio-time-box': {
      display: 'flex',
      color: '#A0A0A0',
      alignItems: 'center',
      gap: '2rem',
      marginBottom: '1.3rem',

      p: {
         fontSize: '12px',
         fontWeight: '400',
         display: 'flex',
         alignItems: 'center',
         gap: '0.5rem',
      },
   },

   '& .description-container': {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      width: '750px',
      marginBottom: '120px',
      marginTop: '30px',

      '& > .descriptioon-text': {
         marginTop: '0.6rem',
         fontSize: '18px',
         lineHeight: '23.4px',
      },

      '& > .read-more-text': {
         color: '#7E52FF',
         display: 'flex',
         alignItems: 'flex-end',
         gap: '0.5rem',

         '& > .arrow-down': {
            transform: 'rotate(-90deg)',
         },
      },
   },

   '& .rieltor-info': {
      display: 'flex',
      backgroundColor: 'white',
      boxShadow: ' 0px 7px 12px 1px rgba(34, 60, 80, 0.14)',
      borderRadius: '10px',
      padding: '20px',
      gap: '1rem',

      '& > .user-icon-container': {
         width: '76px',
         height: '76px',
         display: 'flex',
         alignItems: 'center',
         justifyContent: 'center',
         borderRadius: '4px',
         border: '1px solid #b2b0b0',
         backgroundColor: '#CED1D7',
      },
   },

   '& .breadcrumbs-box': {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '1rem',

      '& > .go-back': {
         display: 'flex',
         alignItems: 'center',
         gap: '10px',
         color: ' #7E52FF',
         fontSize: '14px',
      },
   },

   '& .second-block': {
      display: 'flex',
      flexDirection: 'column',
      gap: '2.5rem',
   },

   '& .second_box': {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      borderRadius: '10px',
      width: '460px',
      padding: '15px',
      paddingTop: '20px',
      height: '350px',
      boxShadow: ' 0px 7px 12px 1px rgba(34, 60, 80, 0.14)',
      backgroundColor: 'white',

      '& .main-info': {
         display: 'flex',
         justifyContent: 'space-between',
         alignItems: 'center',

         '& > .price': {
            fontSize: '28px',
            fontWeight: '700',
            lineHeight: '36px',
            color: '#282828',
         },
      },

      '& > .info-box-container': {
         display: 'flex',
         flexDirection: 'column',
         width: '100%',
         gap: '0.7rem',

         '& > .info-part': {
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '14px',
            fontWeight: '400',
            lineHeight: '20px',
            color: '#282828',

            '& .line': {
               border: '1px dotted #909090',
               width: '30%',
            },
         },
      },
   },

   '& .btns-container': {
      display: 'flex',
      gap: '0.8rem',
      flexDirection: 'column',
   },

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
      gap: '1rem',

      '& .images': {
         display: 'flex',
         gap: '1.1rem',
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
      marginBottom: '1rem',
   },

   '& .description_detail-info': {
      fontSize: '30px',
      lineHeight: '36px',
      letterSpacing: '-0.5px',
   },
}));
