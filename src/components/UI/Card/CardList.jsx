import { useState, useEffect } from 'react';
import { Grid, styled } from '@mui/material';
import { CardItem } from './CardItem';
import { SceletonCard } from './SceletonCard';

export const CardList = () => {
   const [loading, setLoading] = useState(true);
   const [cards, setCards] = useState([]);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await fetch(
               'https://eb1e88b90b215b03.mokky.dev/text',
            );
            const data = await response.json();
            setCards(data);
         } catch (error) {
            console.error('Error fetching data:', error);
         } finally {
            setLoading(false);
         }
      };

      setTimeout(fetchData, 3000);
   }, []);

   return (
      <StyledContainer>
         {loading && <SceletonCard cards={8} />}
         <CardListBox container spacing={3}>
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
   justifyContent: 'center',
   width: '100%',
   [theme.breakpoints.down('sm')]: {
      padding: '0 16px',
   },
   [theme.breakpoints.down('xs')]: {
      padding: '0',
   },
}));

const CardListBox = styled(Grid)({
   marginTop: '20px',
   width: '100%',
});
