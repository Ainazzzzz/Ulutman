import { my_ads } from '../../utils/constants/myads';
import { CheckBox } from '../UI/Checkbox';
import Clock from '../../assets/icons/clock-icon.svg?react';
import Eye from '../../assets/icons/eye-icon.svg?react';
import Message from '../../assets/icons/gray-message.svg?react';
import Favorite from '../../assets/icons/gray-heart.svg?react';
import Call from '../../assets/icons/call-icon.svg?react';
import Edit from '../../assets/icons/pensil-icon.svg?react';
import Deactivate from '../../assets/icons/deactivate-icon.svg?react';
import { styled } from '@mui/material';
import { useState } from 'react';

export const MyAds = ({ selectedIds, setSelectedIds, myAds }) => {
   const [deactivatedIds, setDeactivatedIds] = useState([]);

   const handleCheckboxChange = id => {
      console.log('ID объявления:', id);

      setSelectedIds(prev =>
         prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id],
      );
   };

   const toggleActivation = id => {
      setDeactivatedIds(prev =>
         prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id],
      );
   };

   return (
      <CONTAINER>
         {myAds.length === 0 ? (
            <p>Нет данных для выбранной вкладки</p>
         ) : (
            myAds.map(item => {
               const isDeactivated = deactivatedIds.includes(item.id);

               return (
                  <Wrapper
                     key={item.id}
                     style={{ opacity: isDeactivated ? 0.3 : 1 }}
                  >
                     <BigBox>
                        <CheckBox
                           checked={selectedIds.includes(item.id)}
                           onChange={() => handleCheckboxChange(item.id)}
                        />
                        <Box>
                           <ImageStyle src={item.image} alt="room-image" />
                           <Container>
                              <Title>{item.title}</Title>
                              <FirstBlock>
                                 <MiniBlock>
                                    <Clock />
                                    <span>{item.createDate}</span>
                                 </MiniBlock>
                                 <MiniBlock>
                                    <Eye />
                                    <span>{item.visibility}</span>
                                 </MiniBlock>
                              </FirstBlock>
                              <SecondBlock>
                                 <SecondMiniBlock>
                                    <Favorite />
                                    <span>{item.favorites}</span>
                                 </SecondMiniBlock>
                                 <SecondMiniBlock>
                                    <Call />
                                    <span>{item.calls}</span>
                                 </SecondMiniBlock>
                              </SecondBlock>
                           </Container>
                        </Box>
                     </BigBox>
                     <AnotherContainer>
                        <AnotherBlock>
                           <Edit />
                           <p>Редактировать</p>
                        </AnotherBlock>
                        <AnotherBlock onClick={() => toggleActivation(item.id)}>
                           {isDeactivated ? (
                              <p>Активировать</p>
                           ) : (
                              <>
                                 <Deactivate />
                                 <p>Деактивировать</p>
                              </>
                           )}
                        </AnotherBlock>
                     </AnotherContainer>
                  </Wrapper>
               );
            })
         )}
      </CONTAINER>
   );
};

const ImageStyle = styled('img')(({ theme }) => ({
   width: '154px',
   height: '124px',
   borderRadius: '8px',
   [theme.breakpoints.down('md')]: {
      width: '94px',
      height: '74px',
   },
}));
const Title = styled('p')(({ theme }) => ({
   fontWeight: '500',
   fontSize: '18px',
   color: '#282828',
   [theme.breakpoints.down('md')]: {
      fontSize: '16px',
      width: '190px',
   },
}));
const MiniBlock = styled('div')(() => ({
   display: 'flex',
   alignItems: 'center',
   gap: '4px',
   span: {
      fontWeight: '400',
      fontSize: '12px',
      color: '#a0a0a0',
   },
}));
const SecondMiniBlock = styled('div')(() => ({
   display: 'flex',
   alignItems: 'center',
   gap: '6px',
   span: {
      fontWeight: '400',
      fontSize: '14px',
      color: '#909090',
   },
}));
const FirstBlock = styled('div')(() => ({
   display: 'flex',
   gap: '24px',
}));
const SecondBlock = styled('div')(() => ({
   display: 'flex',
   gap: '14px',
}));
const Container = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '10px',
}));
const AnotherBlock = styled('div')(({ theme }) => ({
   display: 'flex',
   gap: '10px',
   alignItems: 'center',
   p: {
      fontWeight: '400',
      color: '#909090',
      cursor: 'pointer',
      [theme.breakpoints.down('md')]: {
         fontSize: '14px',
      },
   },
}));
const AnotherContainer = styled('div')(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '10px',
   [theme.breakpoints.down('md')]: {
      flexDirection: 'initial',
      justifyContent: 'center',
   },
}));

const Box = styled('div')(() => ({
   display: 'flex',
   gap: '20px',
}));

const Wrapper = styled('div')(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-between',
   svg: {
      cursor: 'pointer',
   },
   [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      gap: '18px',
   },
}));
const BigBox = styled('div')(() => ({
   display: 'flex',
}));
const CONTAINER = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '40px',
}));
