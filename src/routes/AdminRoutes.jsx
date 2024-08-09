import { Navigate } from 'react-router-dom';
import { Dashboard } from '../components/Admin/Dashboard';
import Users from '../components/Admin/Users';
import { AddMailingPage } from '../pages/Admin/AddMailingPage';
import { ModerationPage } from '../pages/Admin/ModerationPage';
import { PrivateAuthRouteByRole } from './private/PrivateAuthRouteByRole';
import { Ads } from '../components/Admin/ads/Ads';

export const AdminRoutes = role => {
   const adminRoutes = [
      {
         path: '',
         element: <Navigate to={'dashboard'} />,
      },
      {
         path: 'dashboard',
         element: (
            <PrivateAuthRouteByRole
               role={role}
               roles={['ADMIN']}
               fallBackPath="/"
               RouteComponent={<Dashboard />}
            />
         ),
      },
      {
         path: 'users',
         element: (
            <PrivateAuthRouteByRole
               role={role}
               roles={['ADMIN']}
               fallBackPath="/"
               RouteComponent={<Users />}
            />
         ),
      },
      {
         path: 'ads',
         element: (
            <PrivateAuthRouteByRole
               role={role}
               roles={['ADMIN']}
               fallBackPath="/"
               RouteComponent={<Ads />}
            />
         ),
      },
      {
         path: 'add-mailing',
         element: (
            <PrivateAuthRouteByRole
               role={role}
               roles={['ADMIN']}
               fallBackPath="/"
               RouteComponent={<AddMailingPage />}
            />
         ),
      },
   ];
   return adminRoutes;
};
