import { CardMedia, styled } from '@mui/material';

export const AdvertisingCategory = ({ image }) => {
   return <Image image={image} title="Реклама" />;
};

const Image = styled(CardMedia)(() => ({
   width: '285px',
   minHeight: '407px',
   borderRadius: '10px',
}));
