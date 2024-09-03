import {
   Navigate,
   RouterProvider,
   createBrowserRouter,
} from 'react-router-dom';

import { AdminRoutes } from './AdminRoutes';
import { MainLayout } from '../layout/RouteWrapper/MainLayout';
import { AdminLayout } from '../layout/RouteWrapper/AdminLayout';
import { PrivateAuthRouter } from './private/PrivateAuthRoute';
import { UserRoutes } from './UserRoutes';
import { useSelector } from 'react-redux';
import NotFoundPage from '../pages/NotFound';

export const AppRoutes = () => {
   const { userData } = useSelector(state => state.auth);

   const pathsByRole = {
      ADMIN: '/admin',
      USER: '/user',
      GUEST: '/',
   };

   const router = createBrowserRouter([
      {
         path: '/',
         element: <Navigate to="user" replace />,
      },
      {
         path: '/user',
         element: (
            <PrivateAuthRouter
               Component={<MainLayout />}
               fallBackPath={pathsByRole[userData.role]}
               isAuthorized={
                  userData.role === 'USER' || userData.role === 'GUEST'
               }
            />
         ),
         children: UserRoutes(userData.role),
      },
      {
         path: '/admin',
         element: (
            <PrivateAuthRouter
               Component={<AdminLayout />}
               fallBackPath={pathsByRole[userData.role]}
               isAuthorized={userData.role === 'ADMIN'}
            />
         ),
         children: AdminRoutes(userData.role),
      },
      {
         path: '*',
         element: <NotFoundPage />,
      },
   ]);

   return <RouterProvider router={router} />;
};
