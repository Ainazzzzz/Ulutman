import Breadcrumbs from '../../components/UI/Breadcrumbs';
import { useSelector } from 'react-redux';
import { CardList } from '../../components/UI/Card/CardList';
import { Container } from '../MainPage';

const path = [
   { title: 'Главная', url: '/' },
   { title: 'Все объявление', url: '/recommendations' },
];
export const RecommendationPage = () => {
   const { publishes } = useSelector(state => state.main);

   return (
      <Container>
         <Breadcrumbs path={path} />
         <CardList cards={publishes} />
      </Container>
   );
};
