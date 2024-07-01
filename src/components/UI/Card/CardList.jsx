import { Grid, styled } from '@mui/material';
import { CardItem } from './CardItem';
import { SceletonCard } from './SceletonCard';

export const CardList = ({ cards, advertising, loading }) => {
   return (
      <StyledContainer>
         {loading && <SceletonCard cards={8} />}

         <CardListBox container spacing={2.5}>
            {cards.map(card => (
               <Grid item xs={12} sm={6} md={4} lg={3} key={card.id}>
                  <CardItem {...card} />
               </Grid>
            ))}
         </CardListBox>
      </StyledContainer>
   );
};

const StyledContainer = styled('div')(({ theme }) => ({
   padding: '0 60px',
   display: 'flex',
   justifyContent: 'space-between',
   width: '100%',
   [theme.breakpoints.down('sm')]: {
      padding: '0 16px',
   },
   [theme.breakpoints.down('xs')]: {
      padding: '0',
   },
}));

export const CardListBox = styled(Grid)({
   marginTop: '20px',
   width: '100%',
});
