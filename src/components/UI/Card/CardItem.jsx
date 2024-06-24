import { CardContent, styled } from '@mui/material';
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
      <StyledCardContent>
         <img src={img} alt={title} />

         <ContainerInfo>
            <FirstBlock>
               <div>
                  <b>{price} ₽</b>
                  <p className="title">{title}</p>
               </div>
               <WrapperAddressInfo>
                  <AddressInfo>
                     <Icons.AddressIcon />
                     <p>{address}</p>
                  </AddressInfo>
                  <AddressInfo>
                     <Icons.HomeIcon />
                     <p>{description}</p>
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
      </StyledCardContent>
   );
};

const StyledCardContent = styled(CardContent)(({ theme }) => ({
   borderRadius: '10px',
   padding: theme.spacing(2.5),
   boxShadow: theme.shadows[2],
   backgroundColor: theme.palette.background.paper,
   display: 'flex',
   flexDirection: 'column',
   gap: theme.spacing(2.5),
   img: {
      width: '275px',
      height: '222px',
      borderRadius: '8px',
   },
}));

const ContainerInfo = styled('article')(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-between',
   gap: theme.spacing(1.25),
}));

const FirstBlock = styled('section')(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',
   gap: theme.spacing(1.25),
   height: '118px',
   justifyContent: 'space-between',
   color: theme.palette.text.primary,
   b: {
      fontSize: theme.typography.h5.fontSize,
      fontWeight: theme.typography.fontWeightBold,
   },
   '.title': {
      fontSize: theme.typography.h6.fontSize,
      fontWeight: theme.typography.fontWeightMedium,
      display: '-webkit-box',
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      WebkitLineClamp: 2,
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
}));
