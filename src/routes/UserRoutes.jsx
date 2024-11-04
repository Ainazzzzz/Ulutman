import { Categories } from '../components/Categories.jsx';
import { CategoryTab } from '../components/User/CategoryTab.jsx';
import { FeaturedAds } from '../components/User/FeaturedAds.jsx';
import { Profile } from '../components/User/Profile';
import { MainPage } from '../pages/MainPage';
import { CreateAdPage } from '../pages/user/CreateAdPage';
import DetailInfo from '../pages/user/detail-info/DetailInfo.jsx';
import { RecommendationPage } from '../pages/user/RecommendationPage.jsx';
import { SearchMainPage } from '../pages/user/SearchMainPage.jsx';
import { PATHS } from '../utils/constants/paths.js';
import { PrivateAuthRouteByRole } from './private/PrivateAuthRouteByRole';

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
            roles={['USER']}
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
            roles={['USER']}
            fallBackPath={PATHS.USER.ROOT}
            RouteComponent={<DetailInfo />}
         />
      ),
   },
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
];
