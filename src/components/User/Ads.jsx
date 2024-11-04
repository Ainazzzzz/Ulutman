import { styled, useMediaQuery } from '@mui/material';
import ChevronLeft from '../../assets/icons/chevron-left.svg?react';
import DeleteAll from '../../assets/icons/delete-all-icon.svg?react';
import DeleteMobile from '../../assets/icons/delete-mobile-icon.svg?react';
import { MyAds } from './MyAds';
import TabsUi from '../UI/TabsUi';
import { useEffect, useState } from 'react';
import { DeleteMyAdsModal } from './DeleteMyAdsModal';
import { getMyAds, getRejectedPublishes } from '../../redux/users/myAdsThunk';
import { useDispatch, useSelector } from 'react-redux';

export const Ads = () => {
   const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'));
   const [activeTab, setActiveTab] = useState('1'); // По умолчанию "Активно"
   const dispatch = useDispatch();

   const [selectedIds, setSelectedIds] = useState([]);
   const [isModalOpen, setIsModalOpen] = useState(false);

   const userId = useSelector(state => state.auth.userData.userId);
   const { myAds } = useSelector(state => state.myAds);

   const secondTab = [
      { value: '1', label: 'Активно' },
      { value: '2', label: 'На модерации' },
      { value: '3', label: 'Деактивировано' },
      { value: '4', label: 'Отклонено' },
   ];

   const handleDelete = () => {
      // console.log('selectedId', selectedIds);
      setIsModalOpen(!isModalOpen);
   };

   const handleTabChange = tabValue => {
      setActiveTab(tabValue);

      // Логика запроса для каждой вкладки
      tabValue === '1'
         ? dispatch(getMyAds())
         : tabValue === '2'
           ? dispatch(getModerationAds())
           : tabValue === '3'
             ? dispatch(getDeactivatedAds())
             : dispatch(getRejectedPublishes());
   };

   useEffect(() => {
      dispatch(getMyAds()); // Загружаем данные по умолчанию для активной вкладки
   }, [dispatch]);

   return (
      <Wrapper>
         <Container>
            <Line></Line>
            <Block>
               <TabsUi
                  tabs={secondTab}
                  activeTab={activeTab}
                  onTabChange={handleTabChange}
               />

               {isMobile ? (
                  <DeleteMobile onClick={handleDelete} />
               ) : (
                  <DeleteAll
                     style={{ marginTop: '10px', cursor: 'pointer' }}
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
         {isModalOpen && <DeleteMyAdsModal userId={userId} />}
      </Wrapper>
   );
};

const Line = styled('div')(() => ({
   width: '100%',
   border: '1px solid #d9d9d9',
}));

const Wrapper = styled('div')(({ theme }) => ({
   padding: '40px 60px',
   display: 'flex',
   flexDirection: 'column',
   gap: '40px',
   [theme.breakpoints.down('md')]: {
      padding: '24px 16px',
   },
}));
const Block = styled('div')(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-between',
   [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      gap: '30px',
   },
}));

const Container = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '24px',
}));
