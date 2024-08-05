import Users from '../components/Admin/Users';
import { AddMailingPage } from '../pages/Admin/AddMailingPage';
import { PrivateAuthRouteByRole } from './private/PrivateAuthRouteByRole';

export const AdminRoutes = role => {
   const adminRoutes = [
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
   ];
   return adminRoutes;
};
