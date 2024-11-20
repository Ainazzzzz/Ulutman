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
import { useEffect, useState } from 'react';

import Like from '../../../assets/icons/like-product-icon.svg?react';
import ArrowIcon from '../../../assets/icons/arrowpurpul.svg?react';
import { Button } from '../../../components/UI/Button';
import UserIcon from '../../../assets/icons/user.svg?react';
import AboutApartment from './AboutApartment';
import {
   deleteFavorite,
   getDetailInfo,
   postFavorite,
} from '../../../redux/datailInfo/detailInfoThunk';
import { useDispatch, useSelector } from 'react-redux';
import { PhoneModal } from '../../../components/UI/PhoneModal';
import { SimilarAds } from './SimilarAds';

const DetailInfo = () => {
   const dispatch = useDispatch();
   const detailInfo = useSelector(state => state.detailInfo);
   const [isExpanded, setIsExpanded] = useState(false);
   const [openModal, setOpenModal] = useState(false);

   const handleShowPhoneNumber = () => {
      setOpenModal(!openModal);
   };

   const description =
      detailInfo?.detailInfo?.description || 'Описание не доступно';
   const words = description.split(' ');
   const shortDescription = words.slice(0, 12).join(' ');

   const handleReadMore = () => {
      setIsExpanded(!isExpanded);
   };

   const path = [
      { title: 'Главная', url: '#' },
      { title: '2х комнатная квартира', url: '#' },
   ];

   const handleFavorite = () => {
      const isFavorite = detailInfo?.detailInfo?.detailFavorite;

      if (isFavorite) {
         dispatch(deleteFavorite(detailInfo.detailInfo.id));
      } else {
         dispatch(postFavorite(detailInfo.detailInfo.id));
      }
   };

   useEffect(() => {
      dispatch(getDetailInfo());
   }, []);

   return (
      <div>
         {!detailInfo || Object.keys(detailInfo).length === 0 ? (
            <p>Нет данных </p>
         ) : (
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
                     {detailInfo?.detailInfo?.metro || 'Не указано'}
                  </Typography>

                  <Typography>
                     <ClockIcon />
                     {detailInfo?.detailInfo?.createDate || 'Не указано'}
                  </Typography>
               </Box>

               <Box>
                  <Typography className="title" variant="h3">
                     {detailInfo?.detailInfo?.title || 'Не указано'}
                  </Typography>

                  <Box className="fist-part_container">
                     <Box className="slider">
                        <Swiper
                           cssMode={true}
                           navigation={true}
                           pagination={true}
                           mousewheel={true}
                           keyboard={true}
                           modules={[
                              Navigation,
                              Pagination,
                              Mousewheel,
                              Keyboard,
                           ]}
                           className="mySwiper"
                        >
                           {detailInfo?.detailInfo?.images?.map(slide => (
                              <SwiperSlide key={slide}>
                                 <img
                                    className="slide-image"
                                    src={slide}
                                    alt={`Slide ${slide}`}
                                 />
                              </SwiperSlide>
                           ))}
                        </Swiper>

                        <Box className="images">
                           {detailInfo?.detailInfo?.images?.map(item => (
                              <img
                                 key={item}
                                 src={item}
                                 alt={`Slide ${item}`}
                                 style={{
                                    width: '60px',
                                    height: '64px',
                                    borderRadius: '6px',
                                 }}
                              />
                           ))}
                        </Box>
                     </Box>

                     <Box className="second-block">
                        <Box className="second_box">
                           <Box className="main-info">
                              <Typography className="price">
                                 {detailInfo?.detailInfo?.conditions
                                    ?.pricePerMonth || 'Не указано'}
                                 ₽/мес.
                              </Typography>

                              <Like
                                 onClick={handleFavorite}
                                 style={{
                                    cursor: 'pointer',
                                    fill: detailInfo?.detailInfo?.detailFavorite
                                       ? 'red'
                                       : '',
                                    stroke: detailInfo?.detailInfo
                                       ?.detailFavorite
                                       ? 'red'
                                       : '',
                                 }}
                              />
                           </Box>

                           <Box className="info-box-container">
                              <Typography className="info-part">
                                 Оплата ЖКХ <span className="line" />
                                 {detailInfo?.detailInfo?.conditions
                                    ?.utilitiesIncluded || 'Не указано'}
                              </Typography>

                              <Typography className="info-part">
                                 Залог <span className="line" />{' '}
                                 {detailInfo?.detailInfo?.conditions?.deposit} ₽
                              </Typography>

                              <Typography className="info-part">
                                 Комиссия <span className="line" />
                                 {detailInfo?.detailInfo?.conditions
                                    ?.commission || 'Не указано'}
                              </Typography>

                              <Typography className="info-part">
                                 Предоплата
                                 <span className="line" />
                                 {detailInfo?.detailInfo?.conditions
                                    ?.prepayment || 'Не указано'}
                              </Typography>

                              <Typography className="info-part">
                                 Срок аренды
                                 <span className="line" />
                                 {detailInfo?.detailInfo?.conditions
                                    ?.leaseTerm || 'Не указано'}
                              </Typography>
                           </Box>

                           <Box className="btns-container">
                              <Button onClick={handleShowPhoneNumber}>
                                 Показать телефон
                              </Button>
                              {openModal && <PhoneModal />}
                           </Box>
                        </Box>

                        <Box className="rieltor-info">
                           <Box className="user-icon-container">
                              <UserIcon />
                           </Box>
                           <Box>
                              <Typography>Риелтор</Typography>

                              <Typography>
                                 {detailInfo?.detailInfo?.conditions?.realtor ||
                                    'Не указано'}
                              </Typography>
                              <Rating
                                 value={
                                    detailInfo?.detailInfo?.conditions
                                       ?.realtorRating || 0
                                 }
                                 readOnly
                              />
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
                     {isExpanded ? description : shortDescription}
                     {words.length > 1 && !isExpanded && '...'}{' '}
                  </Typography>
                  {words.length > 1 && (
                     <Typography
                        className="read-more-text"
                        onClick={handleReadMore}
                     >
                        {isExpanded ? 'Скрыть' : 'Читать дальше'}
                        <ArrowIcon
                           className={isExpanded ? 'arrow-up' : 'arrow-down'}
                        />
                     </Typography>
                  )}
               </Box>

               <AboutApartment detailInfo={detailInfo} />
               <SimilarAds />
            </StyledContainer>
         )}
      </div>
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
         cursor: 'pointer',

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
         cursor: 'pointer',
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
      gap: '1rem',
      borderRadius: '10px',
      width: '460px',
      padding: '15px',
      paddingTop: '20px',
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
               // border: '1px dotted #909090',
               // width: '30%',
               border: 'none' /* Убираем стандартный бордер */,
               borderTop: '1px dotted #909090' /* Пунктирный верхний бордер */,
               width: '30%',
               borderStyle: 'dashed' /* Более аккуратный стиль */,
               borderWidth: '1px' /* Толщина линии */,
               borderColor: '#909090' /* Цвет */,
               borderSpacing: '1px',
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

      '& .swiper-button-prev': {
         color: '#222222',
         opacity: '1',
         backgroundColor: 'white',

         padding: '20px',
         borderRadius: '50%',
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

const ImageStyle = styled(() => ({
   width: 'px',
   height: '100px',
}));
