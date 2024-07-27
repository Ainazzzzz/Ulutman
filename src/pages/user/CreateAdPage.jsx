import Breadcrumbs from '../../components/UI/Breadcrumbs';
import { CreateAdForm } from '../../components/User/CreateAdForm';

export const CreateAdPage = () => {
   const path = [
      { title: 'Главная', url: '/' },
      { title: 'Новое объявление', url: '/create-ad' },
   ];
   return (
      <div>
         <Breadcrumbs path={path} />
         <h1>Новое объявление</h1>
         <CreateAdForm />
      </div>
   );
};
