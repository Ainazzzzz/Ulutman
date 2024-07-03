import { styled, useMediaQuery } from '@mui/material';
import { category } from '../../utils/constants/category-card';
import SumIcon from '../../assets/icons/sum-icon.svg?react';
import Geolocation from '../../assets/icons/geolocation-icon.svg?react';
import Home from '../../assets/icons/home-icon.svg?react';
import GrayHeart from '../../assets/icons/gray-heart-icon.svg?react';
import GrayMessage from '../../assets/icons/gray-message-icon.svg?react';
import { IconButton } from '../IconButton';

export const CategoryCard = () => {
   const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'));
   return (
      <>
         {category.map(item => (
            <Container key={item.id}>
               {isMobile ? (
                  <>
                     <Block>
                        <ImageStyle src={item.image} alt="kk" />
                        <div>
                           <FirstBlock>
                              <Price>
                                 {item.price} <SumIcon />{' '}
                              </Price>
                              <IconButton>
                                 <GrayHeart />
                              </IconButton>
                           </FirstBlock>
                           <RoomStyle>
                              {item.room}х комнатная квартира
                              <IconButton>
                                 <GrayMessage />
                              </IconButton>
                           </RoomStyle>
                           <SecondBlock>
                              <Geolocation />
                              <p>
                                 {item.city}, р-н {item.area}
                              </p>
                           </SecondBlock>
                           <SecondBlock>
                              <Home />
                              <p>
                                 {item.quantity} -комн. кв. {item.volume}м
                                 <sup>2</sup> {item.floor} этаж
                              </p>
                           </SecondBlock>
                           <Description>{item.description}</Description>
                        </div>
                     </Block>
                  </>
               ) : (
                  <Wrapper>
                     <Block>
                        <ImageStyle src={item.image} alt="kk" />
                     </Block>
                     <div>
                        <FirstBlock>
                           <Price>
                              {item.price} <SumIcon />{' '}
                           </Price>
                           <div>
                              <IconButton>
                                 <GrayHeart />
                              </IconButton>
                              <IconButton>
                                 <GrayMessage />
                              </IconButton>
                           </div>
                        </FirstBlock>
                        <RoomStyle>{item.room}х комнатная квартира</RoomStyle>
                        <SecondBlock>
                           <Geolocation />
                           <p>
                              {item.city}, р-н {item.area}
                           </p>
                        </SecondBlock>
                        <SecondBlock>
                           <Home />
                           <p>
                              {item.quantity} -комн. кв. {item.volume}м
                              <sup>2</sup> {item.floor} этаж
                           </p>
                        </SecondBlock>
                        <Description>{item.description}</Description>
                     </div>
                  </Wrapper>
               )}
            </Container>
         ))}
      </>
   );
};
const ImageStyle = styled('img')(({ theme }) => ({
   width: '275px',
   height: '222px',
   borderRadius: '8px',
   position: 'relative',
   top: '20px',
   left: '20px',
   [theme.breakpoints.down('md')]: {
      width: '303px',
      height: '169px',
      top: '0px',
      left: '0px',
   },
}));
const Block = styled('div')(({ theme }) => ({
   width: '315px',
   height: '262px',
   borderRadius: '10px',
   background: '#fff',
   [theme.breakpoints.down('md')]: {
      width: '325px',
      height: '331px',
      padding: '10px',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
   },
}));
const Container = styled('div')(({ theme }) => ({
   height: '262px',
   [theme.breakpoints.down('md')]: {
      height: '331px',
   },
}));
const Price = styled('p')(({ theme }) => ({
   fontSize: '24px',
   fontWeight: '600',
   paddingBottom: '10px',
   [theme.breakpoints.down('md')]: {
      fontSize: '22px',
      paddingBottom: '0px',
   },
}));
const RoomStyle = styled('p')(({ theme }) => ({
   fontSize: '18px',
   fontWeight: '500',
   paddingBottom: '10px',
   [theme.breakpoints.down('md')]: {
      fontSize: '16px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingBottom: '0px',
   },
}));
const SecondBlock = styled('div')(() => ({
   display: 'flex',
   alignItems: 'center',
   paddingTop: '6px',
   gap: '4px',
   p: {
      fontSize: '14px',
      fontWeight: '400',
   },
}));
const Description = styled('p')(({ theme }) => ({
   width: '650px',
   fontSize: '18px',
   fontWeight: '400',
   paddingTop: '24px',
   [theme.breakpoints.down('md')]: {
      display: 'none',
   },
}));
const Wrapper = styled('div')(() => ({
   display: 'flex',
   gap: '20px',
}));
const FirstBlock = styled('div')(() => ({
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'space-between',
   div: {
      display: 'flex',
      alignItems: 'center',
   },
}));
