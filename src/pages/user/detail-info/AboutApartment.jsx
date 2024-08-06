import { Box, styled, Typography } from '@mui/material';

const AboutApartment = () => {
   return (
      <StyledContainer>
         <Box className="column">
            <Typography className="aboutApartmen-title">О квартире</Typography>

            <Box className="row">
               <Typography className="name-of-title">Общая площадь</Typography>

               <Typography className="value">48</Typography>
            </Box>
            <Box className="row">
               <Typography className="name-of-title">Жилая площадь</Typography>

               <Typography className="value">30</Typography>
            </Box>
            <Box className="row">
               <Typography className="name-of-title">Площадь кухни</Typography>

               <Typography className="value">10</Typography>
            </Box>
            <Box className="row">
               <Typography className="name-of-title">
                  Высота потолков
               </Typography>

               <Typography className="value">3 м</Typography>
            </Box>
            <Box className="row">
               <Typography className="name-of-title">Планировка</Typography>

               <Typography className="value">Изолированная</Typography>
            </Box>

            <Box className="row">
               <Typography className="name-of-title">Санузел</Typography>

               <Typography className="value">1 совмещенный</Typography>
            </Box>

            <Box className="row">
               <Typography className="name-of-title">Балкон/лоджия</Typography>

               <Typography className="value">1 лоджия, 1 балкон</Typography>
            </Box>

            <Box className="row">
               <Typography className="name-of-title">Вид из окон</Typography>

               <Typography className="value">Во двор</Typography>
            </Box>

            <Box className="row">
               <Typography className="name-of-title">Ремонт</Typography>

               <Typography className="value">Евроремонт</Typography>
            </Box>
         </Box>

         <Box className="column">
            <Typography className="aboutApartmen-title">О доме</Typography>
         </Box>
      </StyledContainer>
   );
};

export default AboutApartment;

const StyledContainer = styled(Box)(() => ({
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
            leineHeight: '24px',
         },
      },
   },
}));
