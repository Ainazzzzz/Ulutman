import { AppRoutes } from './routes/AppRoutes';

const App = () => {
   // useEffect(() => {
   //    const authLocalData = localStorage.getItem('auth');
   //    const parsedData = JSON.parse(authLocalData);
   //    if (parsedData) {
   //       dispatch(autoLogin(parsedData));
   //    }
   // }, [dispatch]);

   return <AppRoutes />;
};

export default App;
