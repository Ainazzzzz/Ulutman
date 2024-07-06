import { PrivateAuthRouteByRole } from './private/PrivateAuthRouteByRole';

export const AdminRoutes = role => {
   const adminRoutes = [
      {
         path: 'item',
         element: (
            <PrivateAuthRouteByRole
               role={role}
               roles={['ADMIN']}
               fallBackPath="/"
               RouteComponent={<h1>Admin Page item</h1>}
            />
         ),
      },
   ];
   return adminRoutes;
};
