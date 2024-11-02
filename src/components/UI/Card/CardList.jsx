import { Grid, styled, useMediaQuery } from '@mui/material';
import { CardItem } from './CardItem';
import { SceletonCard } from './SceletonCard';
import { Advertising } from './Advertising';

export const CardList = ({ cards, advertising, loading }) => {
   const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'));

   return (
      <StyledContainer>
         {loading && <SceletonCard />}

         <CardListBox container spacing={2.5}>
            {cards?.map(card => (
               <Grid item xs={12} sm={6} md={4} lg={3} key={card.id}>
                  <CardItem {...card} />
               </Grid>
            ))}
         </CardListBox>

         {isMobile && advertising && (
            <WrapperAdvertising>
               {advertising?.map(image => (
                  <div key={image.id}>
                     <img
                        src={image.imagePath}
                        alt={`Advertisement ${image.id}`}
                     />
                     <Advertising image={image.imagePath} />
                  </div>
               ))}
            </WrapperAdvertising>
         )}
      </StyledContainer>
   );
};

const StyledContainer = styled('div')(({ theme }) => ({
   padding: theme.breakpoints.down('md') ? '0' : '0 60px',
   display: 'flex',
   gap: '10px',
   width: '100%',
}));

export const CardListBox = styled(Grid)({
   marginTop: '20px',
   width: '100%',

   '.MuiPaper-root': {
      maxWidth: '100%',

      '.MuiCardMedia-root': {
         height: '250px',
      },
   },
});

const WrapperAdvertising = styled('div')({
   display: 'flex',
   flexDirection: 'column',
   gap: '20px',
   marginTop: '40px',
});
