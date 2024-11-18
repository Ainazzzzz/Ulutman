import { Grid } from '@mui/material';
import Skeleton from 'react-loading-skeleton';
import { CardListBox } from './CardList';
import { ContainerInfo, FirstBlock, SecondBlock, StyledCard } from './CardItem';
import { memo } from 'react';

export const SceletonCard = memo(() => {
   return (
      <CardListBox container spacing={3}>
         {Array(4)
            .fill(0)
            .map((_, i) => (
               <Grid key={i} item xs={12} sm={6} md={4} lg={3}>
                  <StyledCard>
                     <Skeleton height={222} borderRadius="8px" />

                     <ContainerInfo>
                        <FirstBlock>
                           <Skeleton width="95%" height={30} />
                           <Skeleton width="95%" height={24} />
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
});
