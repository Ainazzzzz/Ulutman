import { Grid, styled } from '@mui/material';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const SceletonCard = ({ cards }) => {
   return (
      <Grid container spacing={3}>
         {Array(cards)
            .fill(0)
            .map((_, i) => (
               <StyledSkeletonCard key={i} item xs={12} sm={6} md={4} lg={3}>
                  <Skeleton width={275} height={222} borderRadius="8px" />
                  <ContainerInfo>
                     <FirstBlock>
                        <div>
                           <Skeleton width={150} height={30} />
                           <Skeleton width="95%" height={24} />
                        </div>
                        <WrapperAddressInfo>
                           <AddressInfo>
                              <Skeleton width={230} height={16} />
                              <Skeleton width="100%" height={20} />
                           </AddressInfo>
                           <AddressInfo>
                              <Skeleton width={230} height={16} />
                              <Skeleton width="100%" height={20} />
                           </AddressInfo>
                        </WrapperAddressInfo>
                     </FirstBlock>

                     <SecondBlock>
                        <Skeleton width={24} height={24} />
                        <Skeleton width={24} height={24} />
                     </SecondBlock>
                  </ContainerInfo>
               </StyledSkeletonCard>
            ))}
      </Grid>
   );
};

const StyledSkeletonCard = styled(Grid)(({ theme }) => ({
   width: '313px',
   height: '404px',
   padding: theme.spacing(2.5),
   borderRadius: '10px',
   boxShadow: theme.shadows[2],
   backgroundColor: theme.palette.background.paper,

   display: 'flex',
   flexDirection: 'column',
   gap: theme.spacing(2.5),
}));

const ContainerInfo = styled('article')(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-between',
   gap: theme.spacing(1.25),
}));

const FirstBlock = styled('section')(({ theme }) => ({
   width: '240px',
   display: 'flex',
   flexDirection: 'column',
   height: '118px',
   justifyContent: 'space-between',
   gap: theme.spacing(1.25),

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
}));

const WrapperAddressInfo = styled('section')(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',
   gap: theme.spacing(0.75),
}));

const AddressInfo = styled('div')(({ theme }) => ({
   display: 'flex',
   flexDirection: 'row',
   gap: theme.spacing(0.625),
}));
