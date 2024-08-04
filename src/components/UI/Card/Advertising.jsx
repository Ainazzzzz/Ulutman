import { CardMedia, styled } from '@mui/material';

export const Advertising = ({ image }) => {
   return <Image image={image} title="Квартира в Москве" />;
};

const Image = styled(CardMedia)(() => ({
   width: '118px',
   minHeight: '200px',
   borderRadius: '8px',
}));
