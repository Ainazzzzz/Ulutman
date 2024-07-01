import { Advertising } from './components/UI/Card/Advertising';
import { CardList } from './components/UI/Card/CardList';
import { cards } from './utils/constants';

function App() {
   return (
      <div
         style={{
            display: 'flex',
            justifyContent: 'space-between',
            position: 'relative',
         }}
      >
         <CardList cards={cards} />
         {/* <Advertising /> */}
      </div>
   );
}

export default App;
