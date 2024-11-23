import { useState } from 'react';
import { Grid, styled, useMediaQuery } from '@mui/material';
import { CardItem } from './CardItem';
import { SceletonCard } from './SceletonCard';
import { Advertising } from './Advertising';
import { useDispatch, useSelector } from 'react-redux';
import {
   deleteFavoriteStatus,
   updateFavoriteStatus,
} from '../../../redux/main/mainThunk';
import { SignIn } from '../../../pages/user/auth/SignIn';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../../../utils/constants/paths';

export const CardList = ({ cards, advertising, loading, onDeleteById }) => {
   const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'));
   const { isAuth } = useSelector(state => state.auth);
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const [openLogin, setOpenLogin] = useState(false);

   const updateFavoriteHandler = id => {
      if (isAuth) {
         dispatch(updateFavoriteStatus(id));
      } else {
         setOpenLogin(true);
      }
   };

   const deleteFavoriteHandler = id => {
      if (isAuth) {
         dispatch(deleteFavoriteStatus(id));
      } else {
         setOpenLogin(true);
      }
   };

   const handleCloseLogin = () => {
      setOpenLogin(false);
   };

   const handleNavigateDetail = id => {
      navigate(PATHS.USER.DETAILS.replace(':detailsInfo', id));
   };
   return (
      <StyledContainer>
         {loading ? (
            <SceletonCard />
         ) : (
            <CardListBox container spacing={2.5}>
               {cards?.map(card => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={card.id}>
                     <CardItem
                        {...card}
                        onNavigateDetail={handleNavigateDetail}
                        onUpdateFavorite={() => updateFavoriteHandler(card.id)}
                        onDeleteFavorite={() => deleteFavoriteHandler(card.id)}
                     />
                  </Grid>
               ))}
            </CardListBox>
         )}
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
         <SignIn open={openLogin} onClose={handleCloseLogin} />{' '}
      </StyledContainer>
   );
};

const StyledContainer = styled('div')(({ theme }) => ({
   padding: theme.breakpoints.down('md') ? '0' : '0 60px',
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
