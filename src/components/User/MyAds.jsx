/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { styled } from '@mui/material'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { CheckBox } from '../UI/Checkbox'
import Clock from '../../assets/icons/clock-icon.svg?react'
import Favorite from '../../assets/icons/gray-heart.svg?react'
import { RaisingPublication } from '../../redux/users/myAdsThunk'
import { showToast } from '../../hooks/useToast'

export const MyAds = ({
   selectedIds,
   setSelectedIds,
   myAds,
   variant = 'full',
}) => {
   const dispatch = useDispatch()
   const { t } = useTranslation()

   const handleCheckboxChange = id => {
      setSelectedIds(prev =>
         prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id],
      )
   }
   const handleRaising = async id => {
      try {
         const res = await dispatch(RaisingPublication(id)).unwrap()

         showToast('success', res?.timeToNextBoost)
      } catch (error) {
         showToast('error', error)
      }
   }

   return (
      <CONTAINER>
         {myAds.length === 0 ? (
            <p>{t('user.myAds.myAdsMessage')}</p>
         ) : variant === 'image' ? (
            <WrapperAdvertising>
               {myAds.map(item => (
                  <WrapperAdvertisingCard key={item.id}>
                     <ImageStyleAdvertising
                        src={item.images?.[0] || item.imageFile}
                        alt="room-image"
                     />
                  </WrapperAdvertisingCard>
               ))}
            </WrapperAdvertising>
         ) : (
            myAds.map(item => {
               return (
                  <Wrapper key={item.id}>
                     <BigBox>
                        <CheckBox
                           checked={selectedIds.includes(item.id)}
                           onChange={() => handleCheckboxChange(item.id)}
                        />

                        <Box>
                           <ImageStyle
                              src={item.images?.[0] || item.imageFile}
                              alt="room-image"
                           />

                           <Container>
                              <Title>{item.title}</Title>

                              <FirstBlock>
                                 <MiniBlock>
                                    <Clock />
                                    <span>{item.createDate}</span>
                                 </MiniBlock>
                              </FirstBlock>

                              <SecondBlock>
                                 <SecondMiniBlock>
                                    <Favorite />
                                    <span>{item.favoriteCount}</span>
                                 </SecondMiniBlock>
                              </SecondBlock>
                           </Container>
                        </Box>
                     </BigBox>

                     <AnotherContainer>
                        <AnotherBlock>
                           <p onClick={() => handleRaising(item.id)}>
                              {t('user.myAds.boost')}
                           </p>
                        </AnotherBlock>
                     </AnotherContainer>
                  </Wrapper>
               )
            })
         )}
      </CONTAINER>
   )
}

const ImageStyle = styled('img')(({ theme }) => ({
   width: '154px',
   height: '124px',
   borderRadius: '8px',
   [theme.breakpoints.down('md')]: {
      width: '94px',
      height: '74px',
   },
}))
const ImageStyleAdvertising = styled('img')(({ theme }) => ({
   width: '354px',
   height: '224px',
   borderRadius: '8px',
   [theme.breakpoints.down('md')]: {
      width: '154px',
      height: '94px',
   },
}))
const Title = styled('p')(({ theme }) => ({
   fontWeight: '500',
   fontSize: '18px',
   color: '#282828',
   [theme.breakpoints.down('md')]: {
      fontSize: '16px',
      width: '190px',
   },
}))
const MiniBlock = styled('div')(() => ({
   display: 'flex',
   alignItems: 'center',
   gap: '4px',
   span: {
      fontWeight: '400',
      fontSize: '12px',
      color: '#a0a0a0',
   },
}))
const SecondMiniBlock = styled('div')(() => ({
   display: 'flex',
   alignItems: 'center',
   gap: '6px',
   span: {
      fontWeight: '400',
      fontSize: '14px',
      color: '#909090',
   },
}))
const FirstBlock = styled('div')(() => ({
   display: 'flex',
   gap: '24px',
}))
const SecondBlock = styled('div')(() => ({
   display: 'flex',
   gap: '14px',
}))
const Container = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '10px',
}))
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
}))
const AnotherContainer = styled('div')(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '10px',
   [theme.breakpoints.down('md')]: {
      flexDirection: 'initial',
      justifyContent: 'center',
   },
}))

const Box = styled('div')(() => ({
   display: 'flex',
   gap: '20px',
}))

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
}))
const WrapperAdvertisingCard = styled('div')(({ theme }) => ({
   display: 'flex',
   svg: {
      cursor: 'pointer',
   },
}))
const WrapperAdvertising = styled('div')(({ theme }) => ({
   display: 'flex',
   gap: '95px',
   flexWrap: 'wrap',
   svg: {
      cursor: 'pointer',
   },
   [theme.breakpoints.down('md')]: {
      gap: '18px',
   },
}))
const BigBox = styled('div')(() => ({
   display: 'flex',
}))
const CONTAINER = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '40px',
}))
