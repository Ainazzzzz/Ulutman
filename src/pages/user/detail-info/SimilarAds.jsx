import React, { useEffect } from 'react';
import AnnouncementsSorter from '../../../components/AnnouncementsSorter';
import { CARDS, SORT_BY_CATEGROY_OPTIONS } from '../../../utils/constants';
import { CardList } from '../../../components/UI/Card/CardList';
import { Button } from '../../../components/UI/Button';
import { useDispatch } from 'react-redux';
import { getSimilarAds } from '../../../redux/datailInfo/detailInfoThunk';

export const SimilarAds = () => {
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getSimilarAds());
   }, [dispatch]);

   return (
      <div>
         <div>
            <h2>Похожие объявления</h2>
            <AnnouncementsSorter options={SORT_BY_CATEGROY_OPTIONS} />
         </div>
         <CardList
            // cards={sortedAds.slice(0, 8)}
            advertising={CARDS}
            // loading={isLoading}
         />
         {/* <Button variant="category-sort">Посмотреть еще</Button> */}
      </div>
   );
};
