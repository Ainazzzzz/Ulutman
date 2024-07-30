import { styled } from '@mui/material';
import Breadcrumbs from '../../components/UI/Breadcrumbs';
import { CreateAdForm } from '../../components/User/CreateAdForm';

export const CreateAdPage = () => {
   const path = [
      { title: 'Главная', url: '/' },
      { title: 'Новое объявление', url: '/create-ad' },
   ];
   return (
      <Container>
         <Breadcrumbs path={path} />
         <h1>Новое объявление</h1>
         <CreateAdForm />
      </Container>
   );
};

const Container = styled('div')(({ theme }) => ({
   padding: '24px 52px 52px',

   h1: {
      padding: '8px',
   },
}));
