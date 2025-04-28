import { CardMedia, styled } from '@mui/material'

export const AdvertisingCategory = ({ image }) => {
   return <Image image={image} title="Реклама" />
}

const Image = styled(CardMedia)(({ theme }) => ({
   display: 'flex',
   width: '287px',
   height: '407px',
   borderRadius: '10px',
   marginTop: '40px',
   [theme.breakpoints.down('md')]: {},
}))
