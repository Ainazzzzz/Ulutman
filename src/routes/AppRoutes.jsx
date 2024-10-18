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
import { PATHS } from '../utils/constants/paths';

export const AppRoutes = () => {
   const { userData } = useSelector(state => state.auth);

   const pathsByRole = {
      ADMIN: PATHS.ADMIN.ROOT,
      USER: PATHS.USER.ROOT,
      GUEST: PATHS.HOME,
   };

   const router = createBrowserRouter([
      {
         path: PATHS.HOME,
         element: <Navigate to={PATHS.USER.ROOT} replace />,
      },
      {
         path: PATHS.USER.ROOT,
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
         path: PATHS.ADMIN.ROOT,
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
         path: PATHS.FALLBACK,
         element: <NotFoundPage />,
      },
   ]);

   return <RouterProvider router={router} />;
};
