import { Grid, styled } from '@mui/material';
import Skeleton from 'react-loading-skeleton';
import { CardListBox } from './CardList';
import { ContainerInfo, StyledCard } from './CardItem';

export const SceletonCard = ({ cards }) => {
   return (
      <CardListBox container spacing={3}>
         {Array(cards)
            .fill(0)
            .map((_, i) => (
               <Grid key={i} item xs={12} sm={6} md={4} lg={3}>
                  <StyledCard>
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
                  </StyledCard>
               </Grid>
            ))}
      </CardListBox>
   );
};

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
