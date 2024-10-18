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
import { PATHS } from '../utils/constants/paths.js';

export const AdminRoutes = role => [
   {
      path: '',
      element: <Navigate to={PATHS.ADMIN.DASHBOARD} />,
   },
   {
      path: PATHS.ADMIN.DASHBOARD,
      element: (
         <PrivateAuthRouteByRole
            role={role}
            roles={['ADMIN']}
            fallBackPath={PATHS.HOME}
            RouteComponent={<Dashboard />}
         />
      ),
   },
   {
      path: PATHS.ADMIN.USERS,
      element: (
         <PrivateAuthRouteByRole
            role={role}
            roles={['ADMIN']}
            fallBackPath={PATHS.HOME}
            RouteComponent={<Users />}
         />
      ),
   },
   {
      path: PATHS.ADMIN.ADS,
      element: (
         <PrivateAuthRouteByRole
            role={role}
            roles={['ADMIN']}
            fallBackPath={PATHS.HOME}
            RouteComponent={<Ads />}
         />
      ),
   },
   {
      path: PATHS.ADMIN.CATEGORIES,
      element: (
         <PrivateAuthRouteByRole
            role={role}
            roles={['ADMIN']}
            fallBackPath={PATHS.HOME}
            RouteComponent={<CategoryAdmin />}
         />
      ),
   },
   {
      path: PATHS.ADMIN.MODERATION,
      element: (
         <PrivateAuthRouteByRole
            role={role}
            roles={['ADMIN']}
            fallBackPath={PATHS.HOME}
            RouteComponent={<ModerationPage />}
         />
      ),
   },
   {
      path: PATHS.ADMIN.COMPLAINTS,
      element: (
         <PrivateAuthRouteByRole
            role={role}
            roles={['ADMIN']}
            fallBackPath={PATHS.HOME}
            RouteComponent={<ComplaintsModerationPage />}
         />
      ),
   },
   {
      path: PATHS.ADMIN.COMMENTS,
      element: (
         <PrivateAuthRouteByRole
            role={role}
            roles={['ADMIN']}
            fallBackPath={PATHS.HOME}
            RouteComponent={<ModerationPage />}
         />
      ),
   },
   {
      path: PATHS.ADMIN.IMAGES,
      element: (
         <PrivateAuthRouteByRole
            role={role}
            roles={['ADMIN']}
            fallBackPath={PATHS.HOME}
            RouteComponent={<MediaFilesModerationPage />}
         />
      ),
   },
   {
      path: PATHS.ADMIN.MAILING,
      element: (
         <PrivateAuthRouteByRole
            role={role}
            roles={['ADMIN']}
            fallBackPath={PATHS.HOME}
            RouteComponent={<AddMailingPage />}
         />
      ),
   },
   {
      path: PATHS.ADMIN.ADD_ADMIN,
      element: (
         <PrivateAuthRouteByRole
            role={role}
            roles={['ADMIN']}
            fallBackPath={PATHS.HOME}
            RouteComponent={<AddAdmin />}
         />
      ),
   },
   {
      path: PATHS.ADMIN.SETTINGS,
      element: (
         <PrivateAuthRouteByRole
            role={role}
            roles={['ADMIN']}
            fallBackPath={PATHS.HOME}
            RouteComponent={<h1>Settings Page</h1>}
         />
      ),
   },
];
