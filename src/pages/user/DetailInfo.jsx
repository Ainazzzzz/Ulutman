import { Box, Typography } from '@mui/material';
import Breadcrumbs from '../../components/UI/Breadcrumbs';
import LocationIcon from '../../assets'

const DetailInfo = () => {
   const path = [
      { title: 'Главная', url: '#' },
      { title: '2х комнатная квартира', url: '#' },
   ];

   return (
      <div>
         <Breadcrumbs path={path} />
         <Box>
            <Typography></Typography>
         </Box>
      </div>
   );
};

export default DetailInfo;
