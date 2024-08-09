import { Box, styled, Typography } from '@mui/material';
import { dashboard } from '../../utils/constants/dashboard';

const colorMappings = {
   Работа: 'rgba(255, 58, 41, 0.1)',
   Аренда: 'rgba(2, 160, 252, 0.1)',
   Гостиница: 'rgba(67, 57, 242, 0.1)',
   Услуги: 'rgba(52, 181, 58, 0.1)',
   Недвижимость: 'rgba(255, 178, 0, 0.1)',
   Авто: 'rgba(245, 25, 105, 0.1)',
   Продам: 'rgba(7, 249, 234, 0.1)',
   Куплю: 'rgba(0, 128, 128, 0.1)',
};

const customBackgroundColor = (title, value) => ({
   background: colorMappings[title],
   div: {
      background: colorMappings[title].replace('0.1', '1'),
      width: `${(value.value / value.ofValue) * 100}%`,
   },
});

export const Dashboard = () => {
   return (
      <StyledContainer>
         <Title>Dashboard</Title>

         <StyledBox>
            <Typography variant="h1">Популярность категории</Typography>

            <ContainerCategory>
               {dashboard.map(item => (
                  <ContainerListCategory key={item.id}>
                     <WrapperItemFirst>
                        <Typography className="title">{item.title}</Typography>
                        <Typography>
                           {item.value} of {item.ofValue}
                        </Typography>
                     </WrapperItemFirst>

                     <ContainerBackground
                        title={item.title}
                        rating={{ value: item.value, ofValue: item.ofValue }}
                     >
                        <div></div>
                     </ContainerBackground>
                  </ContainerListCategory>
               ))}
            </ContainerCategory>
         </StyledBox>
      </StyledContainer>
   );
};

const StyledContainer = styled('div')(({ theme }) => ({
   width: '100%',
   minHeight: '100vh',
   background: '#F5F6FA',
   fontFamily: 'Kanit',

   padding: '30px',
   paddingRight: '15%',

   display: 'flex',
   flexDirection: 'column',
   gap: '30px',

   [theme.breakpoints.down('md')]: {
      padding: '16px',
   },

   [theme.breakpoints.between('900', '1024')]: {
      paddingRight: '5%',
   },

   h1: {
      fontSize: '34px',
      fontWeight: '600',
      [theme.breakpoints.down('md')]: {
         fontSize: '22px',
      },
   },
}));

const Title = styled('h1')(({ theme }) => ({
   fontSize: '34px',
   fontWeight: '600',
   [theme.breakpoints.down('md')]: {
      fontSize: '20px',
   },
}));

const StyledBox = styled(Box)(({ theme }) => ({
   background: '#fff',
   height: 'fit-content',
   padding: '20px',

   [theme.breakpoints.down('md')]: {
      width: '100%',
      background: 'transparent',
      padding: '0',

      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
   },

   [theme.breakpoints.between('900px', '1024px')]: {
      width: '100%',
      padding: '15px',
      boxSizing: 'border-box',
   },

   h1: {
      fontSize: '34px',
      fontWeight: '600',

      [theme.breakpoints.down('md')]: {
         fontSize: '20px',
      },
   },
}));

const ContainerCategory = styled('section')(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '25px',

   padding: '30px',

   [theme.breakpoints.down('md')]: {
      padding: '0',
      gap: '20px',
   },

   [theme.breakpoints.between('922px', '1024px')]: {
      padding: '15px',
      gap: '20px',
   },
}));

const ContainerListCategory = styled('div')(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '12px',

   [theme.breakpoints.down('md')]: {
      gap: '10px',
   },

   [theme.breakpoints.between('922px', '1024px')]: {
      gap: '10px',
   },
}));

const WrapperItemFirst = styled('div')(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-between',
   gap: '10px',

   '.title': {
      fontSize: '20px',
      fontWeight: '400',
      color: '#000',

      [theme.breakpoints.down('md')]: {
         fontSize: '18px',
      },

      [theme.breakpoints.between('922px', '1024px')]: {
         fontSize: '18px',
      },
   },
   p: {
      color: '#909090',
      fontWeight: '400',
      fontSize: '18px',

      [theme.breakpoints.down('md')]: {
         fontSize: '16px',
      },

      [theme.breakpoints.between('922px', '1024px')]: {
         fontSize: '16px',
      },
   },
}));

const ContainerBackground = styled('div')(({ title, rating }) => {
   const styles = customBackgroundColor(title, rating);

   return {
      width: '100%',
      height: '8px',
      borderRadius: '4px',
      background: styles.background,

      '& > div': {
         background: styles.div.background,
         width: styles.div.width,
         height: '100%',
         borderRadius: '4px',
      },
   };
});
