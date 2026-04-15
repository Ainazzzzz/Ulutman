/* eslint-disable no-unused-expressions */
/* eslint-disable no-nested-ternary */
import { styled, useMediaQuery } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import DeleteIcon from '../../assets/icons/delete.svg?react'
import { MyAds } from './MyAds'
import TabsUi from '../UI/TabsUi'
import { DeleteMyAdsModal } from './DeleteMyAdsModal'
import { getMyAds, myAdvertising } from '../../redux/users/myAdsThunk'

export const Ads = () => {
   const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'))
   const [activeTab, setActiveTab] = useState('1')
   const dispatch = useDispatch()
   const { t } = useTranslation()

   const [selectedIds, setSelectedIds] = useState([])
   const [isModalOpen, setIsModalOpen] = useState(false)

   const userId = useSelector(state => state.auth.userData.userId)

   const activeAdsCount = useSelector(state => state.myAds.activeAds.length)

   const myAdsCount = useSelector(state => state.myAds.myAdvertising.length)

   const myAds = useSelector(state => {
      if (activeTab === '1') return state.myAds.activeAds
      if (activeTab === '3') return state.myAds.myAdvertising
      return []
   })

   const secondTab = [
      { value: '1', label: `${t('user.myAds.label1')} (${activeAdsCount})` },
      { value: '3', label: `${t('user.myAds.label3')} (${myAdsCount})` },
   ]

   const handleDelete = () => {
      if (selectedIds.length > 0) {
         setIsModalOpen(true)
      }
   }

   const handleTabChange = tabValue => {
      setActiveTab(tabValue)

      if (tabValue === '1') {
         dispatch(getMyAds())
      } else if (tabValue === '3') {
         dispatch(myAdvertising())
      }
   }

   useEffect(() => {
      dispatch(getMyAds())
   }, [dispatch])

   return (
      <Wrapper>
         <Container>
            <Line />
            <Block>
               <div>
                  <TabsUi
                     tabs={secondTab}
                     activeTab={activeTab}
                     onTabChange={handleTabChange}
                  />
               </div>

               {isMobile ? (
                  <DeleteAll
                     onClick={handleDelete}
                     style={{
                        cursor:
                           selectedIds.length > 0 ? 'pointer' : 'not-allowed',
                        opacity: selectedIds.length > 0 ? 1 : 0.5,
                     }}
                  >
                     <DeleteIcon />
                     <p
                        onClick={handleDelete}
                        style={{
                           cursor:
                              selectedIds.length > 0
                                 ? 'pointer'
                                 : 'not-allowed',
                           opacity: selectedIds.length > 0 ? 1 : 0.5,
                        }}
                     >
                        {t('user.myAds.delete')}
                     </p>
                  </DeleteAll>
               ) : (
                  <DeleteAll
                     onClick={handleDelete}
                     style={{
                        cursor:
                           selectedIds.length > 0 ? 'pointer' : 'not-allowed',
                        opacity: selectedIds.length > 0 ? 1 : 0.5,
                     }}
                  >
                     <DeleteIcon />
                     <p
                        onClick={handleDelete}
                        style={{
                           cursor:
                              selectedIds.length > 0
                                 ? 'pointer'
                                 : 'not-allowed',
                           opacity: selectedIds.length > 0 ? 1 : 0.5,
                        }}
                     >
                        {t('user.myAds.delete')}
                     </p>
                  </DeleteAll>
               )}
            </Block>
         </Container>

         <MyAds
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
            myAds={myAds}
            variant={activeTab === '3' ? 'image' : 'full'}
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

const DeleteAll = styled('div')(({ theme }) => ({
   padding: '0px 10px 0px 10px',
   marginTop: '8px',
   height: '36px',
   borderRadius: '10px',
   background: '#FF00001A',
   display: 'flex',
   gap: '4px',
   alignItems: 'center',
   justifyContent: 'center',
   [theme.breakpoints.down('md')]: {
      width: '343px',
   },
   p: {
      fontWeight: '500',
      color: '#FF0000',
      cursor: 'pointer',
   },
}))
