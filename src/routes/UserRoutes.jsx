import { Profile } from '../components/User/Profile';
import { MainPage } from '../pages/MainPage';
import { CreateAdPage } from '../pages/user/CreateAdPage';
import { SignIn } from '../pages/user/auth/SignIn.jsx';
import { PrivateAuthRouteByRole } from './private/PrivateAuthRouteByRole';

export const UserRoutes = role => {
   const userRoutes = [
      {
         path: 'sign-in',
         element: (
            <PrivateAuthRouteByRole
               role={role}
               roles={['GUEST']}
               fallBackPath="/user"
               RouteComponent={<SignIn />}
            />
         ),
      },
      {
         index: true,
         element: (
            <PrivateAuthRouteByRole
               role={role}
               roles={['GUEST', 'USER']}
               fallBackPath="/user"
               RouteComponent={<MainPage />}
            />
         ),
      },
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
               roles={['USER']}
               fallBackPath="/user"
               RouteComponent={<CreateAdPage />}
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
