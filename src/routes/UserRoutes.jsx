import { Categories } from '../components/Categories'
import { CategoryTab } from '../components/user/CategoryTab'
import { FeaturedAds } from '../components/User/FeaturedAds'
import { Profile } from '../components/User/Profile'
import { MainPage } from '../pages/MainPage'
import AdversitingPage from '../pages/user/AdversitingPage'
import { CreateAdPage } from '../pages/user/CreateAdPage'
import { MyPage } from '../pages/user/MyPage'
import { RecommendationPage } from '../pages/user/RecommendationPage'
import DetailInfo from '../pages/user/detail-info/DetailInfo'
import { SearchMainPage } from '../pages/user/SearchMainPage'
import { PATHS } from '../utils/constants/paths'
import { PrivateAuthRouteByRole } from './private/PrivateAuthRouteByRole'
import { Ads } from '../components/User/Ads'

export const UserRoutes = role => [
   {
      index: true,
      element: (
         <PrivateAuthRouteByRole
            role={role}
            roles={['GUEST', 'USER']}
            fallBackPath={PATHS.USER.ROOT}
            RouteComponent={<MainPage />}
         />
      ),
   },

   {
      path: PATHS.USER.CATEGORY,
      element: (
         <PrivateAuthRouteByRole
            role={role}
            roles={['GUEST', 'USER']}
            fallBackPath={PATHS.USER}
            RouteComponent={<Categories />}
         />
      ),
      children: [
         {
            path: '',
            element: <CategoryTab />,
         },
      ],
   },

   {
      path: PATHS.USER.CREATE_AD,
      element: (
         <PrivateAuthRouteByRole
            role={role}
            roles={['USER']}
            fallBackPath={PATHS.USER.ROOT}
            RouteComponent={<CreateAdPage />}
         />
      ),
   },
   {
      path: PATHS.USER.RECOMMENDATIONS,
      element: (
         <PrivateAuthRouteByRole
            role={role}
            roles={['USER']}
            fallBackPath={PATHS.USER.ROOT}
            RouteComponent={<RecommendationPage />}
         />
      ),
   },
   {
      path: PATHS.USER.DETAILS,
      element: (
         <PrivateAuthRouteByRole
            role={role}
            roles={['GUEST', 'USER']}
            fallBackPath={PATHS.USER.ROOT}
            RouteComponent={<DetailInfo />}
         />
      ),
   },
   {
      path: PATHS.USER.MY_PAGE,
      element: (
         <PrivateAuthRouteByRole
            role={role}
            roles={['USER']}
            fallBackPath={PATHS.USER.ROOT}
            RouteComponent={<MyPage />}
         />
      ),
      children: [
         {
            path: PATHS.USER.PROFILE,
            element: (
               <PrivateAuthRouteByRole
                  role={role}
                  roles={['USER']}
                  fallBackPath={PATHS.USER.ROOT}
                  RouteComponent={<Profile />}
               />
            ),
         },
         {
            path: PATHS.USER.MY_ADS,
            element: (
               <PrivateAuthRouteByRole
                  role={role}
                  roles={['USER']}
                  fallBackPath={PATHS.USER.ROOT}
                  RouteComponent={<Ads />}
               />
            ),
         },
      ],
   },
   {
      path: PATHS.USER.MAIN_PHP,
      element: (
         <PrivateAuthRouteByRole
            role={role}
            roles={['USER', 'GUEST']}
            fallBackPath={PATHS.USER.ROOT}
            RouteComponent={<SearchMainPage />}
         />
      ),
   },
   {
      path: PATHS.USER.FAVORITE,
      element: (
         <PrivateAuthRouteByRole
            role={role}
            roles={['USER']}
            fallBackPath={PATHS.USER.ROOT}
            RouteComponent={<FeaturedAds />}
         />
      ),
   },
   {
      path: PATHS.USER.ADVERTISING_PAGE,
      element: (
         <PrivateAuthRouteByRole
            role={role}
            roles={['USER']}
            fallBackPath={PATHS.USER.ROOT}
            RouteComponent={<AdversitingPage />}
         />
      ),
   },
]
