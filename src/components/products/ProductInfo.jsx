import { Box, Typography, List, ListItem, Avatar, styled } from '@mui/material'
import LikeIcon from '../../assets/icons/like-product-icon.svg?react'
import { Button } from '../UI/Button'
import { Rating } from '../UI/Rating'

export const ProductInfo = ({ product, onWrite, onShowPhone, onLiked }) => {
   const productInfo = [
      { label: 'Оплата ЖКХ', value: product.payment },
      { label: 'Залог', value: `${product.pledge}₽` },
      { label: 'Комиссия', value: `${product.commission}%` },
      { label: 'Предоплата', value: product.prepayment },
      { label: 'Срок аренды', value: product.rentalPeriod },
   ]

   return (
      <Box p={2}>
         <InfoBox mb={2}>
            <Header>
               <Typography variant="h4">{product.price}₽/мес.</Typography>
               <LikeIcon
                  className={product.status ? 'like-red' : ''}
                  onClick={onLiked}
               />
            </Header>

            <StyledList>
               {productInfo.map(item => (
                  <StyledListItem key={item.value}>
                     <Typography className="label">{item.label}</Typography>

                     <div className="divider">
                        <DottedDivider />
                     </div>

                     <Typography className="label">{item.value}</Typography>
                  </StyledListItem>
               ))}
            </StyledList>
            <ActionsWrapper>
               <Button variant="contained" onClick={onShowPhone}>
                  Показать телефон
               </Button>

               <StyledButton onClick={onWrite}>Написать</StyledButton>
            </ActionsWrapper>
         </InfoBox>

         <UserBox>
            <StyledAvatar
               src={product.userInfo.imageUrl}
               alt={product.userInfo.userName}
            />

            <Box className="wrapper-info">
               <Typography variant="subtitle1" className="who">
                  {product.userInfo.who}
               </Typography>

               <Typography variant="h6">{product.userInfo.userName}</Typography>

               <Rating ratings={product.userInfo.ratings} />
            </Box>
         </UserBox>
      </Box>
   )
}

const InfoBox = styled(Box)(({ theme }) => ({
   maxWidth: '460px',
   borderRadius: '10px',
   padding: '20px',
   backgroundColor: '#fff',
   boxShadow: theme.shadows[3],

   [theme.breakpoints.down('md')]: {
      padding: '16px',
      backgroundColor: 'transparent',
      boxShadow: 'none',
   },

   h4: {
      fontSize: '28px',
      fontWeight: 700,
      lineHeight: '28px',
      color: '#282828',
      marginBottom: '24px',

      [theme.breakpoints.down('md')]: {
         fontSize: '24px',
         fontWeight: 700,
      },
   },
}))

const Header = styled('div')(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-between',
   gap: theme.spacing(1),

   svg: {
      cursor: 'pointer',
   },

   '.like-red path': {
      stroke: 'none',
      fill: 'red',
   },
}))

const StyledList = styled(List)(({ theme }) => ({
   padding: 0,
   display: 'flex',
   flexDirection: 'column',
   gap: theme.spacing(1),

   '.label': {
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: '20px',
      color: '#282828',
   },
}))

const StyledListItem = styled(ListItem)({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'end',
   padding: 0,

   '.divider': {
      flexGrow: 1,
      paddingBottom: '4px',
   },
})

const DottedDivider = styled('div')({
   paddingBottom: '5px',
   borderBottom: '1px dotted',
   margin: '0 4px',
})

const ActionsWrapper = styled('div')(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',
   gap: theme.spacing(2.25),
   marginTop: theme.spacing(2.5),
}))

const StyledButton = styled(Button)(() => ({
   height: '40px',
   backgroundColor: '#7E52FF1A',
   color: '#7E52FF',
   boxShadow: 'none',

   '&:hover': {
      backgroundColor: '#9774FF',
      color: '#FFF',
   },
}))

const UserBox = styled(Box)(({ theme }) => ({
   display: 'flex',
   gap: theme.spacing(2),

   maxWidth: '452px',
   backgroundColor: '#fff',
   borderRadius: '10px',
   padding: '20px',
   boxShadow: theme.shadows[3],

   [theme.breakpoints.down('md')]: {
      padding: '16px',
      backgroundColor: 'transparent',
      boxShadow: 'none',
   },

   '.who': {
      fontSize: '12px',
      fontWeight: 700,
      color: '#737A8E',
   },

   h6: {
      fontSize: '18px',
      fontWeight: 600,
      color: '#152242',
   },

   '& .wrapper-info': {
      display: 'flex',
      flexDirection: 'column',
      gap: theme.spacing(0.25),
   },
}))

const StyledAvatar = styled(Avatar)(() => ({
   width: '76px',
   height: '76px',
   borderRadius: '4px',
   backgroundColor: '#7E52FF33',
}))
