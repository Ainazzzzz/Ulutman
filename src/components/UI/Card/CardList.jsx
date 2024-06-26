import { useState, useEffect } from 'react';
import { Box, styled } from '@mui/material';
import { CardItem } from './CardItem';
import { SceletonCard } from './SceletonCard';

export const CardList = () => {
   const [loading, setLoading] = useState(true);
   const [cards, setCards] = useState([]);

   useEffect(() => {
      setTimeout(() => {
         fetch('https://eb1e88b90b215b03.mokky.dev/text')
            .then(response => response.json())
            .then(data => {
               setCards(data);
               setLoading(false);
            });
      }, 1000);
   }, []);

   return (
      <StyledCardListBox>
         {loading && <SceletonCard cards={8} />}
         {cards.map(item => (
            <CardItem key={item.id} {...item} loading={loading} />
         ))}
      </StyledCardListBox>
   );
};

const StyledCardListBox = styled(Box)(() => ({
   display: 'flex',
   flexWrap: 'wrap',
   gap: '20px',
   justifyContent: 'center',
}));
