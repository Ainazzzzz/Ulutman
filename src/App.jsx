import { AppRoutes } from './routes/AppRoutes';
<<<<<<< HEAD
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { autoLogin } from './redux/auth/authSlice';
import { Ads } from './components/User/Ads';
=======
>>>>>>> f45b30c7c8471f93d9cf89aba2bebdf9012fa736

const App = () => {
   return (
      <>
         <AppRoutes />
         <Ads />
      </>
   );
};

export default App;
