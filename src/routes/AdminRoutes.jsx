import { Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { PrivateAuthRouteByRole } from './private/PrivateAuthRouteByRole'
import { Loading } from '../components/UI/Loading'
import { PATHS } from '../utils/constants/paths'

const Advertising = lazy(() => import('../pages/Admin/advertising/Advertising'))

const Dashboard = lazy(() => import('../pages/Admin/dashboard/Dashboard'))
const AddMailingPage = lazy(() => import('../pages/Admin/AddMailingPage'))

const Ads = lazy(() => import('../pages/Admin/ads/Ads'))
const CategoryAdmin = lazy(
   () => import('../pages/Admin/category/CategoryAdmin'),
)

const Users = lazy(() => import('../pages/Admin/users/Users'))
const AddAdmin = lazy(() => import('../pages/Admin/users/AddAdmin'))
const AdminMailing = lazy(() => import('../pages/Admin/mailing/AdminMailing'))

export const AdminRoutes = role => {
   const adminRoutes = [
      {
         path: '',
         element: <Navigate to="dashboard" />,
      },
      {
         path: PATHS.ADMIN.DASHBOARD,
         element: (
            <PrivateAuthRouteByRole
               role={role}
               roles={['ADMIN']}
               fallBackPath={PATHS.HOME}
               RouteComponent={
                  <Suspense fallback={<Loading />}>
                     <Dashboard />
                  </Suspense>
               }
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
               RouteComponent={
                  <Suspense fallback={<Loading />}>
                     <Users />
                  </Suspense>
               }
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
               RouteComponent={
                  <Suspense fallback={<Loading />}>
                     <Ads />
                  </Suspense>
               }
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
               RouteComponent={
                  <Suspense fallback={<Loading />}>
                     <CategoryAdmin />
                  </Suspense>
               }
            />
         ),
      },
      {
         path: PATHS.ADMIN.ADVERTISING,
         element: (
            <PrivateAuthRouteByRole
               role={role}
               roles={['ADMIN']}
               fallBackPath={PATHS.HOME}
               RouteComponent={
                  <Suspense fallback={<Loading />}>
                     <Advertising />
                  </Suspense>
               }
            />
         ),
      },
      // {
      //    path: PATHS.ADMIN.MODERATION,
      //    element: <Navigate to={'complaints'} />,
      // },
      //
      // {
      //    path: PATHS.ADMIN.COMPLAINTS,
      //    element: (
      //       <PrivateAuthRouteByRole
      //          role={role}
      //          roles={['ADMIN']}
      //          fallBackPath={PATHS.HOME}
      //          RouteComponent={
      //             <Suspense fallback={<Loading />}>
      //                <ComplaintsModerationPage />
      //             </Suspense>
      //          }
      //       />
      //    ),
      // },
      // {
      //    path: PATHS.ADMIN.COMMENTS,
      //    element: (
      //       <PrivateAuthRouteByRole
      //          role={role}
      //          roles={['ADMIN']}
      //          fallBackPath={PATHS.HOME}
      //          RouteComponent={
      //             <Suspense fallback={<Loading />}>
      //                <ModerationPage />
      //             </Suspense>
      //          }
      //       />
      //    ),
      // },
      // {
      //    path: 'moderation/images',
      //    element: (
      //       <PrivateAuthRouteByRole
      //          role={role}
      //          roles={['ADMIN']}
      //          fallBackPath="/"
      //          RouteComponent={
      //             <Suspense fallback={<Loading />}>
      //                <MediaFilesModerationPage />
      //             </Suspense>
      //          }
      //       />
      //    ),
      // },

      {
         path: PATHS.ADMIN.MAILING,
         element: (
            <PrivateAuthRouteByRole
               role={role}
               roles={['ADMIN']}
               fallBackPath={PATHS.HOME}
               RouteComponent={
                  <Suspense fallback={<Loading />}>
                     <AdminMailing />
                  </Suspense>
               }
            />
         ),
      },
      {
         path: PATHS.ADMIN.ADD_MAILING,
         element: (
            <PrivateAuthRouteByRole
               role={role}
               roles={['ADMIN']}
               fallBackPath={PATHS.HOME}
               RouteComponent={
                  <Suspense fallback={<Loading />}>
                     <AddMailingPage />
                  </Suspense>
               }
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
               RouteComponent={
                  <Suspense fallback={<Loading />}>
                     <AddAdmin />
                  </Suspense>
               }
            />
         ),
      },
   ]
   return adminRoutes
}
