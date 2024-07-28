import { Profile } from '../components/User/Profile';
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
         path: 'profile',
         element: (
            <PrivateAuthRouteByRole
               role={role}
               roles={['USER']}
               fallBackPath="/user"
               RouteComponent={<Profile />}
            />
         ),
      },
   ];
   return userRoutes;
};
