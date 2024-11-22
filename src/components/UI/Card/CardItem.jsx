import { Card, CardContent, CardMedia, styled } from '@mui/material';
import HomeIcon from '../../../assets/icons/home-icon.svg?react';
import AddressIcon from '../../../assets/icons/address-icon.svg?react';
import PhoneIcon from '../../../assets/icons/phone-icon.svg?react';
import LikeIcon from '../../../assets/icons/like-icon.svg?react';
import { useState } from 'react';
import Modal from '../Modal';
import emptyImageCard from '../../../assets/images/no-image.jpg';

export const CardItem = ({
   description,
   images,
   price,
   address,
   detailFavorite,
   onUpdateFavorite,
   onDeleteFavorite,
   phoneNumber,
   id,
   onNavigateDetail,
}) => {
   const [openPhoneModal, setOpenPhoneModal] = useState(false);

   const handleOpenPhoneModal = () => {
      setOpenPhoneModal(!openPhoneModal);
   };

   const [phoneModal, setPhoneModal] = useState('');

   return (
      <StyledCard>
         <StyledCardMedia
            image={images[0] || emptyImageCard}
            title={description}
            onClick={() => onNavigateDetail(id)}
         />

         <ContainerInfo>
            <FirstBlock>
               <div>
                  <Price>{price} ₽</Price>
                  <Title>{description}</Title>
               </div>

               <WrapperAddressInfo>
                  <AddressInfo>
                     <AddressIcon />
                     <AddressText>{address}</AddressText>
                  </AddressInfo>

                  <AddressInfo>
                     <HomeIcon />
                     <AddressText>{description}</AddressText>
                  </AddressInfo>
               </WrapperAddressInfo>
            </FirstBlock>

            <SecondBlock>
               <LikeIcon
                  className={detailFavorite ? 'like-red' : ''}
                  onClick={() => {
                     detailFavorite
                        ? onDeleteFavorite(id)
                        : onUpdateFavorite(id);
                  }}
               />
               <PhoneIcon onClick={() => setPhoneModal(id)} />
            </SecondBlock>
            <Modal
               open={id === phoneModal}
               variant="phone"
               handleClose={() => setPhoneModal('')}
            >
               <WrapperPhone>
                  <TitlePhone>Номер телефона</TitlePhone>
                  <PhoneNumberSingle>{phoneNumber}</PhoneNumberSingle>
               </WrapperPhone>
            </Modal>
         </ContainerInfo>
      </StyledCard>
   );
};

export const StyledCard = styled(Card)(({ theme }) => ({
   maxWidth: '315px',
   borderRadius: '10px',
   padding: theme.spacing(2.5),
   boxShadow: theme.shadows[2],
   backgroundColor: theme.palette.background.paper,

   display: 'flex',
   flexDirection: 'column',
   gap: theme.spacing(2.5),

   [theme.breakpoints.down('md')]: {
      maxWidth: '209px',
      padding: 0,
      backgroundColor: 'transparent',
      boxShadow: 'none',
      gap: '18px',
   },
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
   height: '222px',
   borderRadius: '8px',

   [theme.breakpoints.down('md')]: {
      height: '144px',
   },
}));

export const ContainerInfo = styled(CardContent)({
   display: 'flex',
   justifyContent: 'space-between',
   gap: '10px',

   padding: 0,
});

export const FirstBlock = styled('div')(({ theme }) => ({
   width: '240px',

   display: 'flex',
   flexDirection: 'column',
   gap: theme.spacing(1.25),

   color: theme.palette.text.primary,

   [theme.breakpoints.down('md')]: {
      gap: '10px',
   },
}));

const Title = styled('p')(({ theme }) => ({
   fontSize: theme.typography.h6.fontSize,
   fontWeight: theme.typography.fontWeightMedium,

   display: '-webkit-box',
   WebkitBoxOrient: 'vertical',
   overflow: 'hidden',
   textOverflow: 'ellipsis',
   WebkitLineClamp: 1,

   [theme.breakpoints.down('md')]: {
      fontSize: '14px',
      fontWeight: '500',
   },
}));

const Price = styled('b')(({ theme }) => ({
   fontSize: '24px',
   fontWeight: theme.typography.fontWeightBold,

   [theme.breakpoints.down('md')]: {
      fontSize: '16px',
      fontWeight: '600',
   },
}));

export const SecondBlock = styled('div')(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',
   gap: theme.spacing(1.75),

   svg: {
      cursor: 'pointer',
   },

   '.like-red path, .message-red path': {
      fill: 'red',
   },
   '.phone-icon path': {
      '&:hover': {
         fill: '#5EB00E',

         cursor: 'pointer',
      },
   },
}));

export const WrapperAddressInfo = styled('div')(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',
   gap: theme.spacing(0.75),
}));

export const AddressInfo = styled('div')(({ theme }) => ({
   display: 'flex',
   gap: theme.spacing(0.625),
   alignItems: 'center',

   svg: {
      width: '16px',
      height: '16px',
   },
}));

const AddressText = styled('p')(({ theme }) => ({
   display: '-webkit-box',
   WebkitBoxOrient: 'vertical',
   overflow: 'hidden',
   textOverflow: 'ellipsis',
   WebkitLineClamp: 1,

   [theme.breakpoints.down('md')]: {
      fontSize: '10px',
      fontWeight: '400',
   },
}));

export const WrapperPhone = styled('div')({
   display: 'flex',
   alignItems: 'center',
   flexDirection: 'column',
   gap: '24px',
   padding: '10px 0 20px 0',
});

export const TitlePhone = styled('p')({
   fontSize: '20px',
   fontWeight: '400',
   color: '#202020',
});

export const PhoneNumberSingle = styled('h1')({
   fontSize: '24px',
   fontWeight: '500',
   color: '#282828',
});
