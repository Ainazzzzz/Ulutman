/* eslint-disable no-unused-expressions */
import { Card, CardContent, CardMedia, styled } from '@mui/material'
import { useState } from 'react'
import HomeIcon from '../../../assets/icons/home-icon.svg?react'
import AddressIcon from '../../../assets/icons/address-icon.svg?react'
import PhoneIcon from '../../../assets/icons/phone-icon.svg?react'
import LikeIcon from '../../../assets/icons/like-icon.svg?react'
import emptyImageCard from '../../../assets/images/no-image.jpg'
import { PhoneModal } from '../PhoneModal'

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
   title,
}) => {
   const [phoneModal, setPhoneModal] = useState(false)

   const handleClose = () => {
      setPhoneModal(false)
   }

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
                  <Title onClick={() => onNavigateDetail(id)}>{title}</Title>
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
                        : onUpdateFavorite(id)
                  }}
               />
               <PhoneIcon onClick={() => setPhoneModal(true)} />
            </SecondBlock>

            <PhoneModal
               open={phoneModal}
               handleClose={handleClose}
               phoneNumber={phoneNumber}
            />
         </ContainerInfo>
      </StyledCard>
   )
}

export const StyledCard = styled(Card)(({ theme }) => ({
   maxWidth: '315px',
   borderRadius: '10px',
   padding: theme.spacing(2.5),
   boxShadow: theme.shadows[2],
   backgroundColor: theme.palette.background.paper,
   transition: '500ms',

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

   ':hover': {
      transform: 'scale(1.01)',
      boxShadow: '0px 7px 30px -16px rgba(0,0,0,0.75)',
   },
}))

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
   height: '222px',
   borderRadius: '8px',
   cursor: 'pointer',

   [theme.breakpoints.down('md')]: {
      height: '144px',
   },
}))

export const ContainerInfo = styled(CardContent)({
   display: 'flex',
   justifyContent: 'space-between',
   gap: '10px',

   padding: 0,
})

export const FirstBlock = styled('div')(({ theme }) => ({
   width: '240px',

   display: 'flex',
   flexDirection: 'column',
   gap: theme.spacing(1.25),

   color: theme.palette.text.primary,

   [theme.breakpoints.down('md')]: {
      gap: '10px',
   },
}))

const Title = styled('p')(({ theme }) => ({
   fontSize: theme.typography.h6.fontSize,
   fontWeight: theme.typography.fontWeightMedium,

   display: '-webkit-box',
   WebkitBoxOrient: 'vertical',
   overflow: 'hidden',
   textOverflow: 'ellipsis',
   WebkitLineClamp: 1,
   cursor: 'pointer',

   [theme.breakpoints.down('md')]: {
      fontSize: '14px',
      fontWeight: '500',
   },

   ':hover': {
      textDecoration: 'underline',
   },
}))

const Price = styled('b')(({ theme }) => ({
   fontSize: '24px',
   fontWeight: theme.typography.fontWeightBold,

   [theme.breakpoints.down('md')]: {
      fontSize: '16px',
      fontWeight: '600',
   },
}))

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
}))

export const WrapperAddressInfo = styled('div')(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',
   gap: theme.spacing(0.75),
}))

export const AddressInfo = styled('div')(({ theme }) => ({
   display: 'flex',
   gap: theme.spacing(0.625),
   alignItems: 'center',

   svg: {
      width: '16px',
      height: '16px',
   },
}))

const AddressText = styled('p')(({ theme }) => ({
   overflow: 'hidden',
   textOverflow: 'ellipsis',
   textWrap: 'nowrap',
   maxWidth: '180px',

   [theme.breakpoints.down('md')]: {
      fontSize: '10px',
      fontWeight: '400',
   },
}))

export const WrapperPhone = styled('div')({
   display: 'flex',
   alignItems: 'center',
   flexDirection: 'column',
   gap: '24px',
   padding: '10px 0 20px 0',
})

export const TitlePhone = styled('p')({
   fontSize: '20px',
   fontWeight: '400',
   color: '#202020',
})

export const PhoneNumberSingle = styled('h1')({
   fontSize: '24px',
   fontWeight: '500',
   color: '#282828',
})
