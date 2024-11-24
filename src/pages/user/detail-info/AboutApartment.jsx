import { Box, styled, Typography } from '@mui/material';
import FacebookIcon from '../../../assets/icons/facebook-icon.svg?react';
import TikTokIcon from '../../../assets/icons/tiktok-icon.svg?react';
import TelegramIcon from '../../../assets/icons/telegram-icon.svg?react';
import WhatsapIcon from '../../../assets/icons/whatsapp-icon.svg?react';
import InstagramIcon from '../../../assets/icons/instagram-icon.svg?react';

const ApartmentInfo = ({ title, value }) => (
   <Box className="row">
      <Typography className="name-of-title">{title}</Typography>
      <Typography className="value">{value}</Typography>
   </Box>
);

const AboutApartment = ({ detailInfo }) => {
   console.log(detailInfo?.detailInfo?.propertyDetails);
   const propertyDetails = detailInfo?.detailInfo?.propertyDetails;

   if (!propertyDetails) {
      return <p></p>;
   }

   const apartmentInfo = [
      {
         title: 'Общая площадь',
         value:
            detailInfo &&
            detailInfo.detailInfo.propertyDetails &&
            detailInfo.detailInfo.propertyDetails.totalArea
               ? detailInfo.detailInfo.propertyDetails.totalArea
               : 'Не указано',
      },
      {
         title: 'Жилая площадь',
         value:
            detailInfo &&
            detailInfo.detailInfo.propertyDetails &&
            detailInfo.detailInfo.propertyDetails.livingArea
               ? detailInfo.detailInfo.propertyDetails.livingArea
               : 'Не указано',
      },
      {
         title: 'Кухонная мебель',
         value:
            detailInfo &&
            detailInfo.detailInfo.propertyDetails &&
            detailInfo.detailInfo.propertyDetails.hasKitchenFurniture
               ? detailInfo.detailInfo.propertyDetails.hasKitchenFurniture
                  ? 'Да'
                  : 'Нет'
               : 'Не указано',
      },
      {
         title: 'Высота потолков',
         value:
            detailInfo &&
            detailInfo.detailInfo.propertyDetails &&
            detailInfo.detailInfo.propertyDetails.ceilingHeight
               ? detailInfo.detailInfo.propertyDetails.ceilingHeight
               : 'Не указано',
      },
      {
         title: 'Планировка',
         value:
            detailInfo &&
            detailInfo.detailInfo.propertyDetails &&
            detailInfo.detailInfo.propertyDetails.layout
               ? detailInfo.detailInfo.propertyDetails.layout
               : 'Не указано',
      },
      {
         title: 'Санузел',
         value:
            detailInfo &&
            detailInfo.detailInfo.propertyDetails &&
            detailInfo.detailInfo.propertyDetails.bathroomType
               ? detailInfo.detailInfo.propertyDetails.bathroomType
               : 'Не указано',
      },
      {
         title: 'Балкон',
         value:
            detailInfo &&
            detailInfo.detailInfo.propertyDetails &&
            detailInfo.detailInfo.propertyDetails.hasBalcony
               ? detailInfo.detailInfo.propertyDetails.hasBalcony
               : 'Не указано',
      },
      {
         title: 'Вид из окон',
         value:
            detailInfo &&
            detailInfo.detailInfo.propertyDetails &&
            detailInfo.detailInfo.propertyDetails.viewFromWindow
               ? detailInfo.detailInfo.propertyDetails.viewFromWindow
               : 'Не указано',
      },
   ];

   const apartmentInfo2 = [
      {
         title: 'Год постройки',
         value:
            detailInfo &&
            detailInfo.detailInfo.propertyDetails &&
            detailInfo.detailInfo.propertyDetails.yearOfConstruction
               ? detailInfo.detailInfo.propertyDetails.yearOfConstruction
               : 'Не указано',
      },
      {
         title: 'Мусоропровод',
         value:
            detailInfo &&
            detailInfo.detailInfo.propertyDetails &&
            detailInfo.detailInfo.propertyDetails.hasGarbageChute
               ? detailInfo.detailInfo.propertyDetails.hasGarbageChute
               : 'Не указано',
      },
      {
         title: 'Количество лифтов',
         value:
            detailInfo &&
            detailInfo.detailInfo.propertyDetails &&
            detailInfo.detailInfo.propertyDetails.numberOfElevators
               ? detailInfo.detailInfo.propertyDetails.numberOfElevators
               : 'Не указано',
      },
      {
         title: 'Тип дома',
         value:
            detailInfo &&
            detailInfo.detailInfo.propertyDetails &&
            detailInfo.detailInfo.propertyDetails.buildingType
               ? detailInfo.detailInfo.propertyDetails.buildingType
               : 'Не указано',
      },
      {
         title: 'Тип перекрытий',
         value:
            detailInfo &&
            detailInfo.detailInfo.propertyDetails &&
            detailInfo.detailInfo.propertyDetails.overlappingType
               ? detailInfo.detailInfo.propertyDetails.overlappingType
               : 'Не указано',
      },
      {
         title: 'Парковка',
         value:
            detailInfo &&
            detailInfo.detailInfo.propertyDetails &&
            detailInfo.detailInfo.propertyDetails.hasParking
               ? detailInfo.detailInfo.propertyDetails.hasParking
               : 'Не указано',
      },
      {
         title: 'Отопление',
         value:
            detailInfo &&
            detailInfo.detailInfo.propertyDetails &&
            detailInfo.detailInfo.propertyDetails.heatingType
               ? detailInfo.detailInfo.propertyDetails.heatingType
               : 'Не указано',
      },
   ];
   const apartmentInfoSocials = [
      <WhatsapIcon />,
      <TelegramIcon />,
      <InstagramIcon />,
      <TikTokIcon />,
      <FacebookIcon />,
   ];

   const MAP =
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d365.48247976201736!2d74.62719552257737!3d42.875802431657775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x389eb78fc81678db%3A0x8f6025b536a29455!2sPeaksoft%20house!5e0!3m2!1sru!2skg!4v1710599618852!5m2!1sru!2skg';

   return (
      <StyledContainer>
         <Box className="first-block_appartment">
            <Box className="column">
               <Typography className="aboutApartmen-title">
                  О квартире
               </Typography>
               {apartmentInfo.map((info, index) => (
                  <ApartmentInfo
                     key={index}
                     title={info.title}
                     value={info.value}
                  />
               ))}
            </Box>
            <Box className="column">
               <Typography className="aboutApartmen-title">О доме</Typography>
               {apartmentInfo2.map((info, index) => (
                  <ApartmentInfo
                     key={index}
                     title={info.title}
                     value={info.value}
                  />
               ))}
            </Box>
         </Box>

         <Box className="column">
            <Typography
               style={{ color: '#152242' }}
               className="aboutApartmen-title aboutApartmen-title_second"
            >
               В квартире есть
            </Typography>

            <Box className="appartment-items">
               {apartmentInfo2.map((info, index) => (
                  <Typography key={index}>{info.title}</Typography>
               ))}
            </Box>
         </Box>

         <Box className="column">
            <Typography
               style={{ color: '#152242', marginTop: '30px' }}
               className="aboutApartmen-title "
            >
               Расположение
            </Typography>

            <StyledMap
               src={MAP}
               width="65%"
               height="500"
               title="map"
               loading="lazy"
               referrerPolicy="no-referrer-when-downgrade"
            />
         </Box>
         <Box className="column">
            <Typography className="aboutApartmen-title">
               Поделиться с друзьями
            </Typography>

            <Box className="socials-box">
               {apartmentInfoSocials.map((icon, index) => (
                  <Box key={index}>{icon}</Box>
               ))}
            </Box>
         </Box>
      </StyledContainer>
   );
};

export default AboutApartment;

const StyledContainer = styled(Box)(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',

   '& .socials-box': {
      display: 'flex',
      gap: '10px',

      '& > div': {
         cursor: 'pointer',
      },
   },
   '& .appartment-items': {
      display: 'flex',
      height: '230px',
      flexDirection: 'column',
      flexWrap: 'wrap',
      alignContent: 'flex-start',
      gap: '.7rem',

      '& > p': {
         fontSize: '1rem',
         lineHeight: '20px',
         margin: '7px 0 ',
         marginRight: '6.25rem',
         color: '#282828',
         [theme.breakpoints.down('md')]: {
            fontSize: '14px',
         },
      },
   },

   '& .aboutApartmen-title_second': {
      marginTop: '70px',
      marginBottom: '40px',
   },

   '& .aboutApartmen-title': {
      fontSize: '30px',
      fontWeight: '700',
      lineHeight: '36px',
      color: '#282828',
      letterSpacing: '-0.5px',
      marginBottom: '25px',
      [theme.breakpoints.down('md')]: {
         fontSize: '24px',
      },
   },

   '& > .first-block_appartment': {
      display: 'flex',
      gap: '50px',
      [theme.breakpoints.down('md')]: {
         flexDirection: 'column',
      },

      '& > .column': {
         width: '370px',
         [theme.breakpoints.down('md')]: {
            width: '315px',
         },

         '& > .row': {
            display: 'flex',
            justifyContent: 'space-between',
            width: '366px',
            height: '50px',
            alignItems: 'center',
            borderBottom: '1px solid #E8E9EC',
            [theme.breakpoints.down('md')]: {
               width: '315px',
            },

            '& > .name-of-title': {
               fontSize: '16px',
               fontWeight: '400',
               lineHeight: '24px',
               color: '#909090',
            },

            '& > .value': {
               lineHeight: '24px',
            },
         },
      },
   },
}));

const StyledMap = styled('iframe')(() => ({
   border: 'none',
   marginBottom: '70px',
}));
