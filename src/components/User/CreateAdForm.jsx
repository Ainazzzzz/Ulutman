import { useReducer } from 'react';
import { Button } from '../UI/Button';
import Input from '../UI/Input';
import ReusableSelect from '../UI/Select';

const options = [
   {
      id: 'e1',
      label: 'Москва',
      value: 'moscow',
   },
   {
      id: 'e2',
      label: 'Казань',
      value: 'kazan',
   },
   {
      id: 'e3',
      label: 'Грозный',
      value: 'groznyi',
   },
];

const reducer = (state, action) => {
   switch (action.type) {
      case 'SET_INPUT':
         return { ...state, [action.field]: action.value };
      default:
         return state;
   }
};

const initialState = {
   name: '',
   phone: '',
   category: '',
   photo: '',
   description: '',
   city: 'Выберите город',
   address: 'Выберите метро',
   metro: 'Улица Крылова дом 1',
};

export const CreateAdForm = () => {
   const [state, dispatch] = useReducer(reducer, initialState);
   return (
      <form>
         <Input value={state.name} />
         <Input value={state.phone} />
         <Input value={state.description} />
         <ReusableSelect label="Город" options={options} value={state.city} />
         <ReusableSelect
            label="Метро *"
            options={options}
            value={state.metro}
         />
         <ReusableSelect
            label="Адрес *"
            options={options}
            value={state.address}
         />
         <Button type="submit">Создать</Button>
      </form>
   );
};
