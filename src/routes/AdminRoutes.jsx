import { Navigate } from 'react-router-dom';
import { Dashboard } from '../components/Admin/Dashboard';
import Users from '../components/Admin/Users';
import { AddMailingPage } from '../pages/Admin/AddMailingPage';
import { ModerationPage } from '../pages/Admin/ModerationPage';
import { PrivateAuthRouteByRole } from './private/PrivateAuthRouteByRole';
import { Ads } from '../components/Admin/ads/Ads';
import CategoryAdmin from '../components/Admin/CategoryAdmin';
import AddAdmin from '../components/Admin/AddAdmin';
import { ComplaintsModerationPage } from '../pages/Admin/ComplaintsModerationPage';
import { MediaFilesModerationPage } from '../pages/Admin/MediaFilesModerationPage';

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
         path: 'media-files',
         element: (
            <PrivateAuthRouteByRole
               role={role}
               roles={['ADMIN']}
               fallBackPath="/"
               RouteComponent={<MediaFilesModerationPage />}
            />
         ),
      },
      {
         path: 'complaints',
         element: (
            <PrivateAuthRouteByRole
               role={role}
               roles={['ADMIN']}
               fallBackPath="/"
               RouteComponent={<ComplaintsModerationPage />}
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
         path: 'add-administrator',
         element: (
            <PrivateAuthRouteByRole
               role={role}
               roles={['ADMIN']}
               fallBackPath="/"
               RouteComponent={<AddAdmin />}
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
