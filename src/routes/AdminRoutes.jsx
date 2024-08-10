import { Navigate } from 'react-router-dom';
import { Dashboard } from '../components/Admin/Dashboard';
import Users from '../components/Admin/Users';
import { AddMailingPage } from '../pages/Admin/AddMailingPage';
import { ModerationPage } from '../pages/Admin/ModerationPage';
import { PrivateAuthRouteByRole } from './private/PrivateAuthRouteByRole';
import { Ads } from '../components/Admin/ads/Ads';
import CategoryAdmin from '../components/Admin/CategoryAdmin';

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
         path: 'categories',
         element: (
            <PrivateAuthRouteByRole
               role={role}
               roles={['ADMIN']}
               fallBackPath="/"
               RouteComponent={<CategoryAdmin />}
            />
         ),
      },
      {
         path: 'moderation',
         element: (
            <PrivateAuthRouteByRole
               role={role}
               roles={['ADMIN']}
               fallBackPath="/"
               RouteComponent={<ModerationPage />}
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
      {
         path: 'settings',
         element: (
            <PrivateAuthRouteByRole
               role={role}
               roles={['ADMIN']}
               fallBackPath="/"
               RouteComponent={<h1>Settings Page</h1>}
            />
         ),
      },
   ];
   return adminRoutes;
};
