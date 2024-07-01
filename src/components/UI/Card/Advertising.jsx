import { CardMedia, styled } from '@mui/material';

export const Advertising = () => {
   return (
      <StyledImage
         src="https://dyatkovo.ru/upload/iblock/50e/mo21t3sui5kmt4me0lqi9vmsr15w5b6g.jpg"
         alt="afasdfdsf"
      />
   );
};

const StyledImage = styled('img')(() => ({
   width: '253px',
   height: '331px',
}));
