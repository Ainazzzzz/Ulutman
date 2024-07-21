import { Navigate } from 'react-router-dom';

export const PrivateAuthRouter = ({
   Component,
   fallBackPath,
   isAuthorized,
}) => {
   return isAuthorized ? Component : <Navigate to={fallBackPath} replace />;
};
