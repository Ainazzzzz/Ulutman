import { Outlet } from 'react-router-dom';
import CustomPagination from '../../components/UI/Pagination';

export const MainLayout = () => {
   return (
      <div>
         <h1>MainLayout</h1>
         <CustomPagination />
         <Outlet />
      </div>
   );
};
