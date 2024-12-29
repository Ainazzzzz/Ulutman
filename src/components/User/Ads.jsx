/* eslint-disable no-unused-expressions */
/* eslint-disable no-nested-ternary */
import { styled, useMediaQuery } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DeleteAll from '../../assets/icons/delete-all-icon.svg?react'
import DeleteMobile from '../../assets/icons/delete-mobile-icon.svg?react'
import { MyAds } from './MyAds'
import TabsUi from '../UI/TabsUi'
import { DeleteMyAdsModal } from './DeleteMyAdsModal'
import { getMyAds, getRejectedPublishes } from '../../redux/users/myAdsThunk'

export const Ads = () => {
   const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'))
   const [activeTab, setActiveTab] = useState('1')
   const dispatch = useDispatch()

   const [selectedIds, setSelectedIds] = useState([])
   const [isModalOpen, setIsModalOpen] = useState(false)

   const userId = useSelector(state => state.auth.userData.userId)

   const activeAdsCount = useSelector(state => state.myAds.activeAds.length)

   const rejectedAdsCount = useSelector(state => state.myAds.rejectedAds.length)
   const myAdsCount = useSelector(state => state.myAds.rejectedAds.length)

   const myAds = useSelector(state =>
      activeTab === '1' ? state.myAds.activeAds : state.myAds.rejectedAds,
   )

   const secondTab = [
      { value: '1', label: `Активно (${activeAdsCount})` },
      { value: '2', label: `Отклонено (${rejectedAdsCount})` },
      { value: '3', label: `Мои рекламы(${myAdsCount})` },
   ]

   const handleDelete = () => {
      if (selectedIds.length > 0) {
         setIsModalOpen(true)
      }
   }

   const handleTabChange = tabValue => {
      setActiveTab(tabValue)

      tabValue === '1'
         ? dispatch(getMyAds())
         : tabValue === '2'
           ? dispatch(getRejectedPublishes())
           : dispatch(MyAds())
   }

   useEffect(() => {
      dispatch(getMyAds())
   }, [dispatch])

   return (
      <Wrapper>
         <Container>
            <Line />
            <Block>
               <TabsUi
                  tabs={secondTab}
                  activeTab={activeTab}
                  onTabChange={handleTabChange}
               />

               {isMobile ? (
                  <DeleteMobile
                     onClick={handleDelete}
                     style={{
                        cursor:
                           selectedIds.length > 0 ? 'pointer' : 'not-allowed',
                        opacity: selectedIds.length > 0 ? 1 : 0.5,
                     }}
                  />
               ) : (
                  <DeleteAll
                     style={{
                        marginTop: '10px',
                        cursor:
                           selectedIds.length > 0 ? 'pointer' : 'not-allowed',
                        opacity: selectedIds.length > 0 ? 1 : 0.5,
                     }}
                     onClick={handleDelete}
                  />
               )}
            </Block>
         </Container>

         <MyAds
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
            myAds={myAds}
         />
         {isModalOpen && (
            <DeleteMyAdsModal userId={userId} selectedIds={selectedIds} />
         )}
      </Wrapper>
   )
}

const Line = styled('div')(() => ({
   width: '100%',
   border: '1px solid #d9d9d9',
}))

const Wrapper = styled('div')(({ theme }) => ({
   padding: '40px 60px',
   display: 'flex',
   flexDirection: 'column',
   gap: '40px',
   [theme.breakpoints.down('md')]: {
      padding: '24px 16px',
   },
}))
const Block = styled('div')(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-between',
   [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      gap: '30px',
   },
}))

const Container = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '24px',
}))
