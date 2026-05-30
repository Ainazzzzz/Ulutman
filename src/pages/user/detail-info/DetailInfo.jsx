import { Box, Typography, styled } from '@mui/material'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Breadcrumbs from '../../../components/UI/Breadcrumbs'
import SEO from '../../../components/SEO'
import LocationIcon from '../../../assets/icons/address-icon.svg?react'
import ClockIcon from '../../../assets/icons/clock-icon.svg?react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import Like from '../../../assets/icons/like-product-icon.svg?react'
import ArrowIcon from '../../../assets/icons/arrowpurpul.svg?react'
import { Button } from '../../../components/UI/Button'
import AboutApartment from './AboutApartment'
import {
   deleteFavorite,
   getDetailInfo,
   postFavorite,
} from '../../../redux/datailInfo/detailInfoThunk'
import { PhoneModal } from '../../../components/UI/PhoneModal'
import { SimilarAds } from './SimilarAds'

const DetailInfo = () => {
   const dispatch = useDispatch()
   const { id } = useParams()
   const navigate = useNavigate()
   const { t } = useTranslation()

   const detailInfo = useSelector(state => state.detailInfo)

   const [isExpanded, setIsExpanded] = useState(false)
   const [openModal, setOpenModal] = useState(false)

   const handleShowPhoneNumber = () => {
      setOpenModal(!openModal)
   }

   const description =
      detailInfo?.detailInfo?.description || 'Описание не доступно'
   const words = description.split(' ')
   const shortDescription = words.slice(0, 12).join(' ')

   const handleReadMore = () => {
      setIsExpanded(!isExpanded)
   }

   const path = [
      { title: t('user.detailInfo.breadcrumbs.main'), url: '/user' },
      { title: detailInfo?.detailInfo?.title, url: '#' },
   ]

   const handleFavorite = () => {
      const isFavorite = detailInfo?.detailInfo?.detailFavorite

      if (isFavorite) {
         dispatch(deleteFavorite({ id: detailInfo.detailInfo.id, t }))
      } else {
         dispatch(postFavorite({ id: detailInfo.detailInfo.id, t }))
      }
   }

   useEffect(() => {
      if (id) {
         dispatch(getDetailInfo({ id }))
      }
   }, [dispatch, id])

   return (
      <div>
         <SEO
            title={detailInfo?.detailInfo?.title}
            description={shortDescription}
            image={detailInfo?.detailInfo?.images?.[0]}
            url={`/user/details/${id}`}
            type="article"
         />
         {!detailInfo || Object.keys(detailInfo).length === 0 ? (
            <p>{t('user.detailInfo.message')} </p>
         ) : (
            <StyledContainer>
               <Box className="breadcrumbs-box">
                  <Breadcrumbs path={path} />

                  <button
                     type="button"
                     onClick={() => navigate(-1)}
                     className="go-back"
                  >
                     <ArrowIcon />
                     {t('user.detailInfo.breadcrumbs.back')}
                  </button>
               </Box>

               <Box>
                  <Typography className="title" variant="h3">
                     {detailInfo?.detailInfo?.title}
                  </Typography>

                  <Box className="fist-part_container">
                     <Box className="slider">
                        <Swiper
                           cssMode
                           navigation
                           pagination
                           mousewheel
                           keyboard
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
                                    alt=""
                                    src={slide}
                                 />
                              </SwiperSlide>
                           ))}
                        </Swiper>

                        <Box className="images">
                           {detailInfo?.detailInfo?.images?.map(item => (
                              <img
                                 key={item}
                                 alt=""
                                 src={item}
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
                                 {detailInfo?.detailInfo?.price}
                                 {t('user.detailInfo.price')}
                              </Typography>

                              <Like
                                 onClick={handleFavorite}
                                 style={{
                                    cursor: 'pointer',
                                    fill: detailInfo?.detailInfo?.detailFavorite
                                       ? '#f00'
                                       : '',
                                    path: {
                                       stroke: detailInfo?.detailInfo
                                          ?.detailFavorite
                                          ? '#f00'
                                          : '#282828',
                                    },
                                 }}
                              />
                           </Box>
                           <Box className="wrapper-info">
                              <Box className="locatio-time-box">
                                 <Typography>
                                    <LocationIcon className="location-icon" />
                                    {detailInfo?.detailInfo?.address}
                                 </Typography>

                                 <Typography>
                                    <ClockIcon />
                                    {detailInfo?.detailInfo?.createDate}
                                 </Typography>

                                 <Typography>
                                    <LocationIcon className="location-icon" />
                                    {detailInfo?.detailInfo?.metroStation}
                                 </Typography>
                              </Box>
                              <Button onClick={handleShowPhoneNumber}>
                                 {t('user.detailInfo.phone')}
                              </Button>
                           </Box>

                           {openModal && (
                              <PhoneModal
                                 handleClose={handleShowPhoneNumber}
                                 open={openModal}
                                 phoneNumber={
                                    detailInfo?.detailInfo?.phoneNumber
                                 }
                              />
                           )}
                        </Box>
                     </Box>
                  </Box>
               </Box>

               <Box className="description-container">
                  <Typography variant="h3" className="description_detail-info">
                     {t('user.detailInfo.description')}
                  </Typography>
                  <Typography className="descriptioon-text" color="gray">
                     {isExpanded ? description : shortDescription}
                     {words.length > 20 && !isExpanded && '...'}
                  </Typography>
                  {words.length > 20 && (
                     <Typography
                        className="read-more-text"
                        onClick={handleReadMore}
                     >
                        {isExpanded
                           ? t('user.detailInfo.hide')
                           : t('user.detailInfo.readMore')}
                        <ArrowIcon
                           className={isExpanded ? 'arrow-up' : 'arrow-down'}
                        />
                     </Typography>
                  )}
               </Box>

               <AboutApartment detailInfo={detailInfo} />
               <SimilarAds currentCategory={detailInfo?.detailInfo?.category} />
            </StyledContainer>
         )}
      </div>
   )
}

export default DetailInfo

const StyledContainer = styled(Box)(({ theme }) => ({
   padding: '0.5rem 3rem',
   [theme.breakpoints.down('md')]: {
      padding: '10px 16px',
   },

   '& .wrapper-info': {
      display: 'flex',
      flexDirection: 'column',
      [theme.breakpoints.down('md')]: {
         flexDirection: 'row',
         alignItems: 'center',
         justifyContent: 'space-between',
         '& button': {
            fontSize: '12px',
            fontWeight: '400',
            padding: '5px 10px',
         },
      },
   },

   '& .locatio-time-box': {
      display: 'flex',
      flexDirection: 'column',
      color: '#A0A0A0',
      gap: '10px',
      marginBottom: '1.3rem',
      [theme.breakpoints.down('md')]: {
         justifyContent: 'space-between',
      },

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
      [theme.breakpoints.down('md')]: {
         paddingBottom: '10px',
         borderBottom: '1px solid black',
      },
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
      [theme.breakpoints.down('md')]: {
         boxShadow: 'none',
         backgroundColor: 'initial',
      },
      '& .rieltor-title': {
         fontSize: '10px',
         color: '#737A8E',
         fontWeight: '700',
      },

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
         border: 'none',
         backgroundColor: 'inherit',
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
      [theme.breakpoints.down('md')]: {
         maxWidth: '350px',
         backgroundColor: 'initial',
         boxShadow: 'none',
      },

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
               border: 'none',
               borderTop: '1px dotted #909090',
               width: '30%',
               borderStyle: 'dashed',
               borderWidth: '1px',
               borderColor: '#909090',
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
      maxWidth: '760px !important',
      maxHeight: '446px !important',
      [theme.breakpoints.down('md')]: {
         width: '343px',
         height: '202px',
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

   '& .fist-part_container': {
      display: 'flex',
      justifyContent: 'space-between',
      [theme.breakpoints.down('md')]: {
         flexDirection: 'column',
         gap: '24px',
      },
   },

   '& .slider': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      width: '760px !important',
      gap: '1rem',
      [theme.breakpoints.down('md')]: {
         width: '343px !important',
         height: '202px !important',
      },

      '& .images': {
         display: 'flex',
         gap: '1.1rem',
         [theme.breakpoints.down('md')]: {
            display: 'none',
         },
      },

      '& .swiper': {
         width: '760px !important',
         display: 'flex',
         borderRadius: '10px',
         justifyContent: 'start',
         [theme.breakpoints.down('md')]: {
            width: '343px !important',
         },
      },

      '& .swiper-initialized': {
         margin: '0 !important',
      },

      '& .swiper-slide': {
         display: 'flex',
         justifyContent: 'start',
         width: '760px !important',
         height: '446px !important',
         [theme.breakpoints.down('md')]: {
            width: '343px !important',
            height: '202px !important',
         },
      },

      '& .swiper-button-prev': {
         color: '#000',
         opacity: '1',
         backgroundColor: 'white',
         padding: '20px',
         borderRadius: '50%',
         width: '52px',
         height: '52px',
         fontWeight: '700',
         ':: after': {
            fontSize: ' 20px',
         },
         [theme.breakpoints.down('md')]: {
            display: 'none',
         },
      },
      '& .swiper-button-next': {
         color: '#000',
         opacity: '1',
         backgroundColor: 'white',
         padding: '20px',
         borderRadius: '50%',
         width: '52px',
         height: '52px',
         fontWeight: '700',
         ':: after': {
            fontSize: ' 20px',
         },
         [theme.breakpoints.down('md')]: {
            display: 'none',
         },
      },

      '& .swiper-slide img': {
         display: 'block',
         width: '100%',
         height: '100%',
         objectFit: 'cover',
         [theme.breakpoints.down('md')]: {
            width: '343px !important',
            height: '202px !important',
         },
      },
   },

   '& .title': {
      fontSize: '34px',
      fontWeight: '500',
      lineHeight: '29.05px',
      marginBottom: '1rem',
      [theme.breakpoints.down('md')]: {
         fontSize: '24px',
      },
   },

   '& .description_detail-info': {
      fontSize: '30px',
      lineHeight: '36px',
      letterSpacing: '-0.5px',
      fontWeight: '600',
      color: '#282828',

      [theme.breakpoints.down('md')]: {
         fontSize: '24px',
      },
   },
}))
