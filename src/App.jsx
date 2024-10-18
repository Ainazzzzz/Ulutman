import { useEffect } from 'react';
import { AppRoutes } from './routes/AppRoutes';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { autoLogin } from './redux/auth/authSlice';
import { Categories } from './components/Categories';

const App = () => {
   const dispatch = useDispatch();

   useEffect(() => {
      const data = Cookies.get('ULUTMAN');

      if (data) {
         const parsedData = JSON.parse(data);

         dispatch(autoLogin(parsedData));
      }
   }, []);

   return (
      <>
         <AppRoutes />
         <Categories />
      </>
   );
};

export default App;
