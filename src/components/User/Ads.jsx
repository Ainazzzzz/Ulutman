import { styled, useMediaQuery } from '@mui/material';
import ChevronLeft from '../../assets/icons/chevron-left.svg?react';
import DeleteAll from '../../assets/icons/delete-all-icon.svg?react';
import DeleteMobile from '../../assets/icons/delete-mobile-icon.svg?react';
import { MyAds } from './MyAds';
import TabsUi from '../UI/TabsUi';
import { useEffect, useState } from 'react';
import { DeleteMyAdsModal } from './DeleteMyAdsModal';
import { getMyAds } from '../../redux/users/myAdsThunk';
import { useDispatch, useSelector } from 'react-redux';

export const Ads = () => {
   // const dispatch = useDispatch();
   // const { myAds } = useSelector(state => state.myAds);
   // console.log(myAds);

   const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'));
   const [selectedIds, setSelectedIds] = useState([]);
   const [isModalOpen, setIsModalOpen] = useState(false);

   const secondTab = [
      { value: '1', label: 'Активно' },
      { value: '2', label: 'На модерации' },
      { value: '3', label: 'Деактивировано' },
      { value: '4', label: 'Отклонено' },
   ];

   const handleDelete = () => {
      console.log('selectedId', selectedIds);
      setIsModalOpen(!isModalOpen);
   };

   // useEffect(() => {
   //    dispatch(getMyAds());
   // }, []);

   return (
      <Wrapper>
         <Container>
            <Line></Line>
            <Block>
               <TabsUi tabs={secondTab} />

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

         <MyAds selectedIds={selectedIds} setSelectedIds={setSelectedIds} />
         {isModalOpen && <DeleteMyAdsModal />}
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
