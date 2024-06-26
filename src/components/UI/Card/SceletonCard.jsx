import { styled } from '@mui/material';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const SceletonCard = ({ cards }) => {
   return Array(cards)
      .fill(0)
      .map((_, i) => (
         <StyledSkeletonCard key={i}>
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
      ));
};

const StyledSkeletonCard = styled('div')(({ theme }) => ({
   borderRadius: '10px',
   padding: theme.spacing(2.5),
   boxShadow: theme.shadows[2],
   backgroundColor: theme.palette.background.paper,
   display: 'flex',
   flexDirection: 'column',
   gap: theme.spacing(2.5),
   width: '313px',
   height: '404px',
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
   gap: theme.spacing(1.25),
   height: '118px',
   justifyContent: 'space-between',

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
