import { CreateAdPage } from '../pages/user/CreateAdPage';
import { PrivateAuthRouteByRole } from './private/PrivateAuthRouteByRole';

export const UserRoutes = role => {
   const userRoutes = [
      {
         path: 'dashboard',
         element: (
            <PrivateAuthRouteByRole
               role={role}
               roles={['USER']}
               fallBackPath="/user"
               RouteComponent={<h1>Dasboard</h1>}
            />
         ),
      },
      {
         path: 'create-ad',
         element: (
            <PrivateAuthRouteByRole
               role={role}
               roles={['USER', 'GUEST']}
               fallBackPath="/user"
               RouteComponent={<CreateAdPage />}
            />
         ),
      },
   ];
   return userRoutes;
};
