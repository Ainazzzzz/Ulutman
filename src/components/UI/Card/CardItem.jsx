import { Card, CardContent, CardMedia, Grid, styled } from '@mui/material';
import { Icons } from '../../../assets';

export const CardItem = ({
   title,
   img,
   description,
   price,
   address,
   favoriteStatus,
   messageStatus,
}) => {
   return (
      <StyledCard>
         <StyledCardMedia image={img} title={title} />
         <ContainerInfo>
            <FirstBlock>
               <div>
                  <b>{price} ₽</b>
                  <p className="title">{title}</p>
               </div>

               <WrapperAddressInfo>
                  <AddressInfo>
                     <div>
                        <Icons.AddressIcon />
                     </div>
                     <p className="address">{address}</p>
                  </AddressInfo>

                  <AddressInfo>
                     <div>
                        <Icons.HomeIcon />
                     </div>
                     <p className="address">{description}</p>
                  </AddressInfo>
               </WrapperAddressInfo>
            </FirstBlock>

            <SecondBlock>
               <Icons.LikeIcon className={favoriteStatus ? 'like-red' : ''} />
               <Icons.MessageIcon
                  className={messageStatus ? 'message-red' : ''}
               />
            </SecondBlock>
         </ContainerInfo>
      </StyledCard>
   );
};

export const StyledCard = styled(Card)(({ theme }) => ({
   width: '100%',
   borderRadius: '10px',
   padding: theme.spacing(2.5),
   boxShadow: theme.shadows[2],
   backgroundColor: theme.palette.background.paper,
   display: 'flex',
   flexDirection: 'column',
   gap: theme.spacing(2.5),
}));

const StyledCardMedia = styled(CardMedia)(() => ({
   height: '222px',
   borderRadius: '8px',
}));

export const ContainerInfo = styled(CardContent)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-between',
   gap: theme.spacing(1.25),
   '&.MuiCardContent-root': {
      padding: '0',
   },
}));

const FirstBlock = styled('section')(({ theme }) => ({
   width: '240px',
   display: 'flex',
   flexDirection: 'column',
   gap: theme.spacing(1.25),
   height: '118px',
   justifyContent: 'space-between',
   color: theme.palette.text.primary,

   b: {
      fontSize: '24px',
      fontWeight: theme.typography.fontWeightBold,
      [theme.breakpoints.up('sm')]: {
         fontSize: '1.375rem', // 22px for screens wider than 600px (sm and up)
      },
      [theme.breakpoints.up('md')]: {
         fontSize: '1.5rem', // 24px for screens wider than 960px (md and up)
      },
   },

   '.title': {
      fontSize: theme.typography.h6.fontSize,
      fontWeight: theme.typography.fontWeightMedium,
      display: '-webkit-box',
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      WebkitLineClamp: 1,
   },

   '.address': {
      display: '-webkit-box',
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      WebkitLineClamp: 1,
   },

   '& > div:first-of-type': {
      display: 'flex',
      flexDirection: 'column',
      gap: theme.spacing(1),
   },
}));

const SecondBlock = styled('section')(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',
   gap: theme.spacing(1.75),

   svg: {
      cursor: 'pointer',
   },

   '.like-red path, .message-red path': {
      fill: 'red',
   },
}));

const WrapperAddressInfo = styled('section')(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',
   gap: theme.spacing(0.75),

   p: {
      display: '-webkit-box',
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      WebkitLineClamp: 2,
   },
}));

const AddressInfo = styled('div')(({ theme }) => ({
   display: 'flex',
   flexDirection: 'row',
   gap: theme.spacing(0.625),

   svg: {
      width: '16px',
      height: '16px',
   },
}));
