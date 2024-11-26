import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { styled } from '@mui/material'
import AnnouncementsSorter from '../../../components/AnnouncementsSorter'
import { SORT_BY_CATEGROY_OPTIONS } from '../../../utils/constants'
import { CardList } from '../../../components/UI/Card/CardList'
import { Button } from '../../../components/UI/Button'
import { getSimilarAds } from '../../../redux/datailInfo/detailInfoThunk'
import { sortPublishesRequest } from '../../../redux/main/mainThunk'

export const SimilarAds = ({ currentCategory }) => {
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const [sortedAds, setSortedAds] = useState([])

   const { similarAds } = useSelector(state => state.detailInfo)

   useEffect(() => {
      dispatch(getSimilarAds())
   }, [dispatch])

   useEffect(() => {
      setSortedAds(similarAds)
   }, [similarAds])

   const handleSortChange = sortValue => {
      dispatch(sortPublishesRequest(sortValue))
   }

   const seeMoreHandler = () => {
      navigate('/user/recommendations')
   }

   useEffect(() => {
      if (currentCategory) {
         const filteredAds = similarAds.filter(
            ad => ad.category === currentCategory,
         )
         setSortedAds(filteredAds)
      } else {
         setSortedAds(similarAds)
      }
   }, [similarAds, currentCategory])

   return (
      <Container>
         <div>
            <Block>
               <Title>Похожие объявления</Title>
               <AnnouncementsSorter
                  options={SORT_BY_CATEGROY_OPTIONS}
                  onSortChange={handleSortChange}
               />
            </Block>
            <CardList cards={sortedAds.slice(0, 8)} />
         </div>
         <Button variant="category-sort" onClick={seeMoreHandler}>
            Посмотреть еще
         </Button>
      </Container>
   )
}

const Title = styled('h2')(({ theme }) => ({
   fontSize: '34px',
   fontWeight: '600',
   color: '#152242',

   [theme.breakpoints.down('md')]: {
      fontSize: '22px',
   },
}))

const Block = styled('div')(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-between',
   [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      gap: '10px',
   },
}))

const Container = styled('div')(({ theme }) => ({
   padding: '60px 0px 60px 0px',
   display: 'flex',
   flexDirection: 'column',
   gap: '24px',
   [theme.breakpoints.down('md')]: {
      padding: '20px 16px 0px 16px',
   },
}))
