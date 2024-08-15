import { Box, styled, Typography } from '@mui/material';

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

         <Box>
            <Box className="column">
               <Typography className="aboutApartmen-title">
                  В квартире есть
               </Typography>
            </Box>
         </Box>
      </StyledContainer>
   );
};

export default AboutApartment;

const StyledContainer = styled(Box)(() => ({
   display: 'flex',
   flexDirection: 'column',

   '& > .first-block_appartment': {
      display: 'flex',
      gap: '50px',

      '& > .column': {
         width: '370px',

         '& > .aboutApartmen-title': {
            fontSize: '30px',
            fontWeight: '700',
            lineHeight: '36px',
            color: '#282828',
            letterSpacing: '-0.5px',
            marginBottom: '25px',
         },

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
