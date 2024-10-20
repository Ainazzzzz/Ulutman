import { Grid, styled, useMediaQuery } from '@mui/material';
import { CardItem } from './CardItem';
import { SceletonCard } from './SceletonCard';
import { Advertising } from './Advertising';
import { useDispatch } from 'react-redux';
import {
   deleteFavoriteStatus,
   updateFavoriteStatus,
} from '../../../redux/main/mainThunk';

export const CardList = ({ cards, advertising, loading }) => {
   const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'));
   const dispatch = useDispatch();

   const updateFavoriteHandler = id => {
      dispatch(updateFavoriteStatus(id));
   };
   const deleteFavoriteHandler = id => {
      dispatch(deleteFavoriteStatus(id));
   };

   return (
      <StyledContainer>
         {loading && <SceletonCard />}

         <CardListBox container spacing={2.5}>
            {cards?.map(card => (
               <Grid item xs={12} sm={6} md={4} lg={3} key={card.id}>
                  <CardItem
                     {...card}
                     onUpdateFavorite={updateFavoriteHandler}
                     onDeleteFavorite={deleteFavoriteHandler}
                  />
               </Grid>
            ))}
         </CardListBox>

         {isMobile && advertising && (
            <WrapperAdvertising>
               {advertising?.map((image, i) => (
                  <Advertising image={image} key={i} />
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
