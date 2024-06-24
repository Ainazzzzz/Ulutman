import { Box, styled } from '@mui/material';
import { cards } from '../../../utils/constants';
import { CardItem } from './CardItem';

export const CardList = () => {
   return (
      <StyledCardListBox>
         {cards.map(item => (
            <CardItem key={item.id} {...item} />
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
