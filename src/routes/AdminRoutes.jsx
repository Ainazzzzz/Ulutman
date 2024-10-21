import { Navigate } from 'react-router-dom';
// import {  } from ;
// import {  } from ;
// import {  } from ;
// import {  } from ;
// import  from ;
// import {  } from ;
// import {  } from '';
// import  from ;
// import  from;
// import  from ;
import { lazy, Suspense } from 'react';
import { PrivateAuthRouteByRole } from './private/PrivateAuthRouteByRole.jsx';
import { Loading } from '../components/UI/Loading.jsx';

const Dashboard = lazy(() => import('../pages/Admin/dashboard/Dashboard.jsx'));
const AddMailingPage = lazy(() => import('../pages/Admin/AddMailingPage'));
const ModerationPage = lazy(
   () => import('../pages/Admin/moderation/ModerationPage'),
);
const Ads = lazy(() => import('../pages/Admin/ads/Ads.jsx'));
const CategoryAdmin = lazy(
   () => import('../pages/Admin/category/CategoryAdmin'),
);
const ComplaintsModerationPage = lazy(
   () => import('../pages/Admin/moderation/ComplaintsModerationPage'),
);
const MediaFilesModerationPage = lazy(
   () => import('../pages/Admin/moderation/MediaFilesModerationPage'),
);
const Users = lazy(() => import('../pages/Admin/users/Users'));
const AddAdmin = lazy(() => import('../pages/Admin/users/AddAdmin'));
const AdminMailing = lazy(
   () => import('../pages/Admin/mailing/AdminMailing.jsx'),
);

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
               RouteComponent={
                  <Suspense fallback={<Loading />}>
                     <Dashboard />
                  </Suspense>
               }
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
               RouteComponent={
                  <Suspense fallback={<Loading />}>
                     <Users />
                  </Suspense>
               }
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
               RouteComponent={
                  <Suspense fallback={<Loading />}>
                     <Ads />
                  </Suspense>
               }
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
               RouteComponent={
                  <Suspense fallback={<Loading />}>
                     <CategoryAdmin />
                  </Suspense>
               }
            />
         ),
      },
      {
         path: 'moderation',
         element: <Navigate to={'complaints'} />,
      },

      {
         path: 'moderation/complaints',
         element: (
            <PrivateAuthRouteByRole
               role={role}
               roles={['ADMIN']}
               fallBackPath="/"
               RouteComponent={
                  <Suspense fallback={<Loading />}>
                     <ComplaintsModerationPage />
                  </Suspense>
               }
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
               RouteComponent={
                  <Suspense fallback={<Loading />}>
                     <ModerationPage />
                  </Suspense>
               }
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
               RouteComponent={
                  <Suspense fallback={<Loading />}>
                     <MediaFilesModerationPage />
                  </Suspense>
               }
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
               RouteComponent={
                  <Suspense fallback={<Loading />}>
                     <AdminMailing />
                  </Suspense>
               }
            />
         ),
      },
      {
         path: 'users/add-mailing',
         element: (
            <PrivateAuthRouteByRole
               role={role}
               roles={['ADMIN']}
               fallBackPath="/"
               RouteComponent={
                  <Suspense fallback={<Loading />}>
                     <AddMailingPage />
                  </Suspense>
               }
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
               RouteComponent={
                  <Suspense fallback={<Loading />}>
                     <AddAdmin />
                  </Suspense>
               }
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
               RouteComponent={
                  <Suspense fallback={<Loading />}>
                     <h1>Settings Page</h1>
                  </Suspense>
               }
            />
         ),
      },
   ];
   return adminRoutes;
};
