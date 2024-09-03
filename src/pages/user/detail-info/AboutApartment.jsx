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

const AboutApartment = () => {
   const apartmentInfo = [
      { title: 'Общая площадь', value: '48' },
      { title: 'Жилая площадь', value: '30' },
      { title: 'Площадь кухни', value: '10' },
      { title: 'Высота потолков', value: '3 м' },
      { title: 'Планировка', value: 'Изолированная' },
      { title: 'Санузел', value: '1 совмещенный' },
      { title: 'Балкон/лоджия', value: '1 лоджия, 1 балкон' },
      { title: 'Вид из окон', value: 'Во двор' },
      { title: 'Ремонт', value: 'Евроремонт' },
   ];

   const apartmentInfo2 = [
      { title: 'Год постройки', value: '2015' },
      { title: 'Мусоропровод', value: 'Нет' },
      { title: 'Количество лифтов', value: '3 пассажи.., 2 грузовых' },
      { title: 'Тип дома', value: 'Монолитный' },
      { title: 'Тип перекрытий', value: 'Железобетонные' },
      { title: 'Парковка', value: 'Подземная' },
      { title: 'Подъезды', value: '1' },
      { title: 'Отопление', value: 'Центральное' },
      { title: 'Аварийность', value: 'Нет' },
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

const StyledContainer = styled(Box)(() => ({
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
   },

   '& > .first-block_appartment': {
      display: 'flex',
      gap: '50px',

      '& > .column': {
         width: '370px',

         '& > .row': {
            display: 'flex',
            justifyContent: 'space-between',
            width: '366px',
            height: '50px',
            alignItems: 'center',
            borderBottom: '1px solid #E8E9EC',

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
