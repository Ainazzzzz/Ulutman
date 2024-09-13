import { Navigate } from 'react-router-dom';
import { Dashboard } from '../pages/Admin/dashboard/Dashboard.jsx';
import { AddMailingPage } from '../pages/Admin/AddMailingPage';
import { ModerationPage } from '../pages/Admin/moderation/ModerationPage';
import { PrivateAuthRouteByRole } from './private/PrivateAuthRouteByRole';
import { Ads } from '../pages/Admin/ads/Ads.jsx';
import CategoryAdmin from '../pages/Admin/category/CategoryAdmin';
import { ComplaintsModerationPage } from '../pages/Admin/moderation/ComplaintsModerationPage';
import { MediaFilesModerationPage } from '../pages/Admin/moderation/MediaFilesModerationPage';
import Users from '../pages/Admin/users/Users';
import AddAdmin from '../pages/Admin/users/AddAdmin';

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
         path: 'moderation/complaints',
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
         path: 'moderation/comments',
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
         path: 'moderation/images',
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
         path: 'users/mailing',
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
