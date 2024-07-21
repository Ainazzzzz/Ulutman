import { Navigate } from 'react-router-dom';

export const PrivateAuthRouteByRole = ({
   RouteComponent,
   role,
   roles = [],
   fallBackPath,
}) => {
   if (roles.includes(role)) {
      return RouteComponent;
   }

   return <Navigate to={fallBackPath} replace />;
};
