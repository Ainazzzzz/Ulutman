import { AddMailingPage } from '../pages/Admin/AddMailingPage';
import { ModerationPage } from '../pages/Admin/ModerationPage';
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
   ];
   return adminRoutes;
};
