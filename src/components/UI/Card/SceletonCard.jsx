import { Grid, styled } from '@mui/material';
import Skeleton from 'react-loading-skeleton';
import { CardListBox } from './CardList';
import {
   AddressInfo,
   ContainerInfo,
   FirstBlock,
   SecondBlock,
   StyledCard,
   WrapperAddressInfo,
} from './CardItem';

export const SceletonCard = () => {
   return (
      <CardListBox container spacing={3}>
         {Array(8)
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
